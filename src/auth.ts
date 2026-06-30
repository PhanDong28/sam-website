import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Simple in-memory rate limiter to slow down brute-force attempts on /admin/login.
// Note: resets on server restart and is per-instance only (fine for a single-server deploy;
// for multi-instance hosting, swap this for a shared store like Redis).
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const attempts = new Map<string, { count: number; firstAttempt: number }>();

function isRateLimited(key: string) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key: string) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function clearAttempts(key: string) {
  attempts.delete(key);
}

// List of allowed admin accounts, sourced from env vars.
// Add more pairs (ADMIN3_EMAIL/ADMIN3_PASSWORD, etc.) the same way if needed later.
const ADMIN_ACCOUNTS = [
  { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  { email: process.env.ADMIN2_EMAIL, password: process.env.ADMIN2_PASSWORD },
].filter((a) => a.email && a.password);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const key = String(credentials.email ?? "unknown").toLowerCase();

        if (isRateLimited(key)) {
          throw new Error("Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.");
        }

        const match = ADMIN_ACCOUNTS.find(
          (a) => a.email === credentials.email && a.password === credentials.password
        );

        if (match) {
          clearAttempts(key);
          return { id: key, name: "Admin", email: credentials.email as string };
        }

        recordFailedAttempt(key);
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
});
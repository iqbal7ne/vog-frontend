import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

async function refreshAccessToken(token: any) {
  try {
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/user/token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.refreshToken}`, // kirim refresh token
        },
        validateStatus: () => true,
      }
    );

    const refreshed = res.data;
    console.log("REFRESH TOKEN RESPONSE:", res.status, refreshed);

    if (res.status < 200 || res.status >= 300 || !refreshed?.data) {
      throw refreshed;
    }

    const expiresInSec =
      refreshed?.data?.EXPIRES_IN ??
      refreshed?.data?.expires_in ??
      refreshed?.data?.expiresIn;
    const nextExpiry = expiresInSec
      ? Date.now() + expiresInSec * 1000
      : Date.now() + 15 * 60 * 1000; // fallback 15 menit

    return {
      ...token,
      accessToken: refreshed.data.ACCESS_TOKEN,
      refreshToken: refreshed.data.REFRESH_TOKEN ?? token.refreshToken, // kalau backend tidak kasih baru, pakai lama
      accessTokenExpires: nextExpiry,
      error: undefined, // reset error kalau sukses
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        NIK: { label: "NIK", type: "text" },
        PASSWORD: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/user/signin`,
            {
              NIK: credentials?.NIK,
              PASSWORD: credentials?.PASSWORD,
            },
            {
              headers: { "Content-Type": "application/json" },
              validateStatus: () => true,
            }
          );

          const raw: any = res?.data;
          console.log("LOGIN RAW RESPONSE:", raw, "STATUS:", res?.status);

          // login gagal → return null agar NextAuth melempar AuthError('CredentialsSignin') tanpa Configuration Error
          if (
            res.status < 200 ||
            res.status >= 300 ||
            !raw?.data?.ACCESS_TOKEN
          ) {
            const message = raw?.message || "Login gagal";
            console.error("Authorize failed:", message, raw);
            return null;
          }

          // login sukses → return user object
          const loginExpiresInSec =
            raw?.data?.EXPIRES_IN ??
            raw?.data?.expires_in ??
            raw?.data?.expiresIn;
          const firstExpiry = loginExpiresInSec
            ? Date.now() + loginExpiresInSec * 1000
            : Date.now() + 15 * 60 * 1000; // fallback 15 menit
          return {
            ...raw.data,
            NIK: credentials?.NIK,
            accessToken: raw.data.ACCESS_TOKEN,
            refreshToken: raw.data.REFRESH_TOKEN,
            accessTokenExpires: firstExpiry,
          };
        } catch (err: any) {
          // Jangan lempar error generic dari sini, karena di NextAuth v5 itu diperlakukan sebagai "Configuration" error.
          console.error("Authorize unexpected error:", err);
          return null; // isyaratkan kredensial/permintaan gagal
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Login baru → simpan token
      if (user) {
        return {
          ...token,
          id: (user as any).id,
          name: (user as any).name,
          email: (user as any).email,
          title: (user as any).title,
          sectionId: (user as any).sectionId,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: (user as any).accessTokenExpires,
        };
      }

      // Kalau belum expired → pakai existing
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Sudah expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).title = token.title;
        (session.user as any).sectionId = token.sectionId;
      }

      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).error = token.error;

      return session;
    },

    async redirect({ url, baseUrl }) {
      const appBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || baseUrl;

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;

      return `${appBaseUrl}/dashboard`;
    },
  },

  session: { strategy: "jwt" },

  pages: { signIn: "/" },

  secret: process.env.NEXTAUTH_SECRET,
});

import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" }
      },
      async authorize(credentials, req) {
        const endpoint = credentials.userType === 'professional'
          ? '/api/auth-professional/login'
          : '/api/auth-user/login';

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (user.error) throw new Error(user.error);

        return user;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },

  pages: {
    signIn: '/login-user',
  }

});

export { handler as GET, handler as POST }
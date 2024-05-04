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
        rol: { label: "User Type", type: "text" }
      },
      async authorize(credentials, req) {
        const endpoint = credentials.rol === 'admin'
          ? '/api/authAdmin/login'
          : '/api/authUser/login';

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

  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user }
  //   },
  //   async session({ session, token }) {
  //     session.user = token;
  //     return session;
  //   }
  // },
  
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.picture = user.picture;
            token.email = user.email;
            token.name = user.name;
            token.apellido = user.apellido;
            token.pais = user.pais;
            token.rol = user.rol;
        }
        return token;
    },
    
    async session({ session, token }) {
        session.user = {
            id: token.id,
            picture: token.picture,
            email: token.email,
            name: token.name,
            apellido: token.apellido,
            pais: token.pais,
            rol: token.rol,
        };
        return session;
    }
},

  pages: {
    signIn: '/login-user',
  }

});

export { handler as GET, handler as POST }
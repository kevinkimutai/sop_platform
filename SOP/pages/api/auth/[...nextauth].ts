import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      type: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@qwerty.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //@ts-ignore
        const { email, password } = credentials;

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        //Check if response was successful
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }

        const user = await res.json();

        const { data } = user;

        // If no error and we have user data, return it
        if (res.ok && data) {
          return data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, ...rest }) {
      // code to modify JWT token
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      // Set session.user to the user object

      //@ts-ignore
      session.user = token.user;

      return session;
    },
  },
};
export default NextAuth(authOptions);

//

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID='953956467856-0qm6pe525p3ponmia2ukvrle8a1m3iv4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';
const NEXTAUTH_SECRET='YOUR_SECRET_KEY_HERE';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);

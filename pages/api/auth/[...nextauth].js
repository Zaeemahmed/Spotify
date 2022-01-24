import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { LOGIN_URL, spotifyApi } from '../../../lib/spotify';

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.refreshAccessToken(token.refreshAccessToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    }
    catch(error) {
        return ({
            ...token,
            error: 'refreshTokenError'
        })

    }
}


export default NextAuth({
    providers: [
        SpotifyProvider({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          authorization: LOGIN_URL,
        })
      ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user, account}) {
            if(user && account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    userName: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                    user: user,
                }
            }
            if(Date.now() < token.accessTokenExpires) {
                return token;
            }
            return await refreshAccessToken(token)
        },
        async session({token, session}) {
            session.user.accessToken = token.accessToken;
            session.user.refreshAccessToken = token.refreshAccessToken;
            session.user.username = token.username;

            return session;
        }
    },
    
})
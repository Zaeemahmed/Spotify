import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { spotifyApi } from '../lib/spotify';

export default function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if(session) {
            if(session.error) {
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);

        }
    }, [session])

    return spotifyApi
}
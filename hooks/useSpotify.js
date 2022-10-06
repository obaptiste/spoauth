import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import spotifyApi from '../lib/spotify';


function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken);
    };
    if(status === "loading") {
      return;
    }
    if(status === "unauthenticated") {
      signOut();
    }
    

  }, [session, status]);

  return spotifyApi;
}

export default useSpotify;

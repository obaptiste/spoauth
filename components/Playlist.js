import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useId } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, selectedPlaylistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

export

function PlaylistComponent() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [selectedPlaylist, setPlaylistState] = useRecoilState(
    selectedPlaylistState
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div>
      <h1>playlist</h1>
      {Object.values(playlists).map((playlist) => {
        return (
          <div
            key={playlist.id}
            className="hover:text-white"
            onClick={() => {
              setPlaylistId(playlist.id);
            }}
          >
            <p>{playlist.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PlaylistComponent;

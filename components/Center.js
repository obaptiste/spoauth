import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  playlistIdState,
  playlistState,
} from "../atoms/playlistAtom";
import useSpotify from "../lib/spotify";

function Center() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [color, setColor] = useState();
  const playlistId  = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-purple-500",
    "from-red-500",
    "from-yellow-500",
    "from-green-500",
    "from-pink-500",
  ];

  useEffect(() => {
    setColor(shuffle(colors).pop());
    try {
      if (!{authenticated: true}) {
        /// do nothing
        signIn();
      }
    } catch (error) {
      console.error(error);
    }
  }, [playlistId, status]); // shuffle colors for background

  useEffect(() => {
    spotifyApi.get(playlistId)
         .then((data) => {
          setPlaylist(data.body)
          .catch((error) => {
            console.error('something went wrong in center.js', error);
          });
  }, [spotifyApi, playlistId, status]); // shuffle])
  });
  
  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`"flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8"`}
      >
        <h1>{playlist && playlist.name}</h1>
        <h3>{playlist && playlist?.description}</h3>
      </section>
    </div>
  );
}

export default Center;

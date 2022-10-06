import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { signIn, useSession, signOut } from "next-auth/react";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

function Center() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
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
      if (!{ authenticated: true }) {
        /// do nothing
        signIn();
      }
    } catch (error) {
      console.error(error);
    }
  }, [playlistId, status]); // shuffle colors for background

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => {
        console.error("something went wrong in center.js", error);
      });
  }, [spotifyApi, playlistId, status]); // shuffle])

  return (
    <div className="flex-grow h-screen overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={signOut}>
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
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist && playlist?.images?.[0]?.url}
          alt=""
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist && playlist?.name}
          </h1>
        </div>
      </section>
      <section>
      <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
        <Songs />
        {playlist?.tracks?.items?.map((track, i) => (
            <div key={track.track.id}>{track.track.name}</div>   
        ))}

      </div>
      </section>
    </div>
  );
}

export default Center;

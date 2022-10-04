import React from "react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signOut, useSession } from "next-auth/react";
import { playlistIdState, selectedPlaylistState } from "../atoms/playlistAtom";

import useSpotify from "../hooks/useSpotify";
import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistState);



  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const handlePlaylist = (playlist) => {
    const { id } = playlist;
    playlist && setPlaylistId(id);
    setSelectedPlaylist(playlist);
  

    console.table("id", playlistId, "selected playlist", selectedPlaylist);
  };

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <p onClick={() => signOut()}>LOGOUT</p>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Song</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <div>
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              onClick={() => handlePlaylist(playlist)}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          ))}
        </div>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>

        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>
        <p className="cursor-pointer hover:text-white">your playlist</p>

        <p className="cursor-pointer hover:text-white">your playlist</p>
      </div>
    </div>
  );
}

export default Sidebar;

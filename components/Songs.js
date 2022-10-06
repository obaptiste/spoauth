import React from "react";
import {useRecoilValue} from 'recoil';
import {playlistState} from '../atoms/playlistAtom';

function Songs({ order, track }) {
  const spotifyApi = useSpotify();
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
        {playlist?.tracks?.items?.map((track, i) => (
            <div>{track.track.name}</div>   
        ))}
      </div>
  );
}

export default Songs;

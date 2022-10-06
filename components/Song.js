import React from "react";
import {useRecoilValue} from 'recoil';
import {playlistState} from '../atoms/playlistAtom';

function Song() {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="hidden md:inline">{track.track.album.name}</p>
      </div>
    </div>
  );
}

export default song;

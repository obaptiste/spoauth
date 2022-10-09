import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

import useSpotify from "./useSpotify";

function useSongInfo() {
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [songInfo, setSongInfo] = useState(null);
  const spotifyApi = useSpotify();

  useEffect(() => {
    const fetchSongInfo =  async () => {
        if (currentIdTrack) {
            const trackInfo = await fetch(`https:://api.spotify.com/v1/tracks/${currentIdTrack}`, 
            {
                headers: {
                    Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                }
            }
            ).then(res => res.json());
            setSongInfo(trackInfo);
        }
    }

    fetchSongInfo();
  }, [currentIdTrack, spotifyApi]);

  return songInfo;

}

  export default useSongInfo;

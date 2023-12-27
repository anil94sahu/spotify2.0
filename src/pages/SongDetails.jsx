import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components' 
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  }

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {activeSong, isPlaying} = useSelector(state => state.player); 
    const {data:songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid});
    const {data, isFetching:isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})

    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />

    if(error) return <Error />
    return(
        <div className="flex flex-col">
            <DetailsHeader artistsId={artistsId} artistsData={artistsData}/>
            <RelatedSongs 
                data={Object.values(artistsData?.songs)}
                artistsId={artistsId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
        
    )
}

export default SongDetails;

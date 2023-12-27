import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components' 
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";


const ArtistDetails = () => {
    const dispatch = useDispatch();
    const {id:artistId} = useParams();
    const {activeSong, isPlaying} = useSelector(state => state.player); 
    const {data:ArtistData, isFetching: isFetchingArtistDetails} = useGetArtistDetailsQuery(artistId);

    if(isFetchingArtistDetails) return <Loader title="Artist details" />

    if(error) return <Error />
    return(
        <div className="flex flex-col">
          
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">
                    Lyrics 
                </h2>
                <div className="mt-5">
                    {songData?.sections[1].type==='LYRICS'?
                    songData?.sections[1].text.map((line,i)=> (
                        <p className="text-gray-400 text-base my-1">{line}</p>
                    )): null
                }
                </div>
            </div>
            <RelatedSongs 
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
        
    )
}

export default ArtistDetails;

import axios from 'axios';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { SongCard } from '../components';
import { useState } from 'react';

const TopCharts = () => {
    const [country, setCountry] = useState('');
    const [activeSong, isPlaying] = useState(state => state.player);
    const {data, isFetching, error} = useGetTopChartsQuery(country);

    if(isFetching) return <Loading title="Loading top chart" />
    
    if(error && country) return <Error />

    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
                Discover
            </h2>
            <div className='font-bold text-3xl text-white sm:justify-start justify-center gap-8'>
                {
                    data?.map((song,i) => (
                        <SongCard 
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            i={i}
                        />
                    ))
                }
            </div>

        </div>
    )
};

export default TopCharts;

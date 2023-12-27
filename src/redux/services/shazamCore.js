import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

/* const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3ca82aceb1msh57c5b13df6b27edp183f3cjsn5de79c87c5f5',
      // 'X-RapidAPI-Host': 'shazam-api6.p.rapidapi.com'
    }
  };
   */
 /*  fetch('https://shazam-api6.p.rapidapi.com/shazam/top_tracks_country', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err)); */

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://shazam-api6.p.rapidapi.com/shazam',
    prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', '3ca82aceb1msh57c5b13df6b27edp183f3cjsn5de79c87c5f5');
        return headers;
    }
}),
endpoints: (builder) => ({
    getTopCharts: builder.query({query: () => '/top_tracks_country?limit=50&country_code=IN'}),
    getSongDetails: builder.query({query: (songid) => `/tracks/details/track_id=${songid}` }),
    getSongRelated: builder.query({query: (songid) => `/tracks/related?track_id=${songid}`}),
    getArtistDetails: builder.query({query: (artistId) => `/about_artist?artist_id=${artistId}`}),
    getSongsByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
}),
})

export const {useGetTopChartsQuery, useGetSongDetailsQuery,
useGetSongRelatedQuery,
useGetArtistDetailsQuery,
useGetSongsByCountryQuery} = shazamCoreApi;
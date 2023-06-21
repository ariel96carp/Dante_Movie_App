import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { get } from 'axios'
import DetailsBanner from './DetailsBanner'
import MovieSlider from '../../common/MovieSlider'
import Loader from '../../common/Loader'

const Details = () => {
    const { category, detailsId } = useParams()
    const API_ENDPOINT = category === 'movies' ? `/movie/${detailsId}` : `/tv/${detailsId}`
    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery(
        [ 'details-query', API_ENDPOINT ],
        async () => {
            const API_URL = process.env.REACT_APP_API_URL
            const API_TOKEN = process.env.REACT_APP_API_TOKEN
            const response = await get(`${API_URL}${API_ENDPOINT}?api_key=${API_TOKEN}&append_to_response=videos,credits&language=en-US&page=1`)
            return [ response.data ]
        }
    )
    if (isLoading) {
        return <Loader inSlider={false} />
    }
    if (isError) {
        return (
            <div className="page-container pt-[var(--header-size)]">
                <p className="text-white py-6">
                    {`The content could not be loaded. ${error}.`}
                </p>
            </div>
        )
    }
    return (
        <>
            {
                data.map(({
                    id,
                    title,
                    name,
                    overview,
                    backdrop_path: backdropPath,
                    poster_path: posterPath,
                    genres,
                    credits,
                    videos
                }) => (
                    <DetailsBanner
                        key={id}
                        title={title}
                        showName={name}
                        description={overview}
                        background={backdropPath}
                        poster={posterPath}
                        genres={genres}
                        credits={credits.cast}
                        videos={videos.results}
                    />
                ))
            }
            <MovieSlider
                description={`${category === 'movies' ? 'Similar movies' : 'Similar series'}`}
                endpoint={`${category === 'movies' ? `/movie/${detailsId}/similar` : `/tv/${detailsId}/similar`}`}
            />
        </>
    )
}

export default Details

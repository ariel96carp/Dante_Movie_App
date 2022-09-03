/* eslint-disable camelcase */
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMovie } from '../../redux/movies'
import { getSerie } from '../../redux/series'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import DetailsBanner from './DetailsBanner'
import FilmSlider from '../../common/FilmSlider'
import Loader from '../../common/Loader'

const Details = () => {
    const { category, detailsId } = useParams()
    const dispatch = useDispatch()
    const actualId = useSelector((state) => {
        switch (category) {
            case 'movies':
                return state.movies.movies.selected.movie
            default:
                return state.series.series.selected.serie
        }
    })
    const actualIdStatus = useSelector((state) => {
        switch (category) {
            case 'movies':
                return state.movies.movies.selected.movieStatus
            default:
                return state.series.series.selected.serieStatus
        }
    })
    useEffect(() => {
        if (category === 'movies') dispatch(getMovie(detailsId))
        else dispatch(getSerie(detailsId))
    }, [ detailsId ])
    useSmoothScroll([ detailsId ])
    return (
        <>
            {
                actualIdStatus === 'loading'
                    && <Loader inSlider={false} />
            }
            {
                actualIdStatus === 'rejected'
                    && (
                        <div className="page-container pt-[var(--header-size)]">
                            <p className="text-white py-6">
                                The content could not be loaded. Please, try again.
                            </p>
                        </div>
                    )
            }
            {
                actualId.length > 0 && actualIdStatus === 'idle'
                    && (
                        actualId.map(({
                            id,
                            title,
                            name,
                            overview,
                            backdrop_path,
                            poster_path,
                            genres,
                            credits,
                            videos
                        }) => (
                            <DetailsBanner
                                key={id}
                                title={title}
                                showName={name}
                                description={overview}
                                background={backdrop_path}
                                poster={poster_path}
                                genres={genres}
                                credits={credits.cast}
                                videos={videos.results}
                            />
                        ))
                    )
            }
            <FilmSlider
                description={`${category === 'movies' ? 'Similar movies' : 'Similar series'}`}
                type={`${category === 'movies' ? 'Similar Movies' : 'Similar Series'}`}
                detailsId={detailsId}
            />
        </>
    )
}

export default Details

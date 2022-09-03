/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useCallbackRef } from 'use-callback-ref'
import Slider from 'react-slick'
import { getUpcomingMovies, getTopRatedMovies, getSimilarMovies } from '../redux/movies'
import { getPopularSeries, getTopRatedSeries, getSimilarSeries } from '../redux/series'
import FilmCard from './FilmCard'
import Loader from './Loader'

const FilmSlider = ({ description, type, detailsId }) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        switch (type) {
            case 'Top Rated Movies':
                return state.movies.movies.topRated.movies
            case 'Upcoming Movies':
                return state.movies.movies.upcoming.movies
            case 'Popular Series':
                return state.series.series.popular.series
            case 'Top Rated Series':
                return state.series.series.topRated.series
            case 'Similar Movies':
                return state.movies.movies.selected.similar
            default:
                return state.series.series.selected.similar
        }
    })
    const dataStatus = useSelector((state) => {
        switch (type) {
            case 'Top Rated Movies':
                return state.movies.movies.topRated.status
            case 'Upcoming Movies':
                return state.movies.movies.upcoming.status
            case 'Popular Series':
                return state.series.series.popular.status
            case 'Top Rated Series':
                return state.series.series.topRated.status
            case 'Similar Movies':
                return state.movies.movies.selected.similarStatus
            default:
                return state.series.series.selected.similarStatus
        }
    })
    const containerRef = useCallbackRef(null, (newValue) => {
        if (!newValue) return () => {}
        const setMaxWidthOnResponsive = () => {
            const smallBp = matchMedia('(max-width: 640px)')
            if (smallBp.matches) {
                newValue.style.maxWidth = `${document.body.clientWidth}px`
            } else if (newValue.getAttribute('style')) {
                newValue.removeAttribute('style')
            }
        }

        setMaxWidthOnResponsive()
        window.addEventListener('resize', setMaxWidthOnResponsive)
        return () => window.removeEventListener('resize', setMaxWidthOnResponsive)
    })
    const sliderRef = useRef()
    const settings = {
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }
    const getDataStored = () => {
        switch (type) {
            case 'Top Rated Movies':
                dispatch(getTopRatedMovies())
                break
            case 'Upcoming Movies':
                dispatch(getUpcomingMovies())
                break
            case 'Popular Series':
                dispatch(getPopularSeries())
                break
            case 'Top Rated Series':
                dispatch(getTopRatedSeries())
                break
            case 'Similar Series':
                dispatch(getSimilarSeries(detailsId))
                break
            default:
                dispatch(getSimilarMovies(detailsId))
        }
    }
    useEffect(() => {
        getDataStored()
    }, [])
    if (dataStatus === 'loading') {
        return <Loader />
    }
    if (dataStatus === 'rejected') {
        return (
            <div className="page-container py-6 text-white">
                <h2 className="font-semibold mb-7">{description}</h2>
                <div className="flex items-center flex-wrap gap-4">
                    <p>The content could not be loaded. Please, try again.</p>
                    <button
                        type="button"
                        className="btn alt"
                        onClick={() => getDataStored()}
                    >
                        Try it again
                    </button>
                </div>
            </div>
        )
    }
    return (
        <section className="text-white font-semibold py-6">
            <div className="page-container" ref={containerRef}>
                <div className="mb-7 flex items-center justify-between">
                    <h2>{description}</h2>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn text-xs"
                            onClick={() => sliderRef.current.slickPrev()}
                        >
                            View less
                        </button>
                        <button
                            type="button"
                            className="btn text-xs"
                            onClick={() => sliderRef.current.slickNext()}
                        >
                            View more
                        </button>
                    </div>
                </div>
                <Slider {...settings} ref={sliderRef}>
                    {
                        data.map(({
                            id,
                            poster_path,
                            title,
                            name
                        }) => (
                            <FilmCard
                                key={id}
                                id={id}
                                poster={poster_path}
                                title={title}
                                name={name}
                            />
                        ))
                    }
                </Slider>
            </div>
        </section>
    )
}

FilmSlider.propTypes = {
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'Top Rated Movies',
        'Upcoming Movies',
        'Popular Series',
        'Top Rated Series',
        'Similar Movies',
        'Similar Series'
    ]).isRequired,
    detailsId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default FilmSlider

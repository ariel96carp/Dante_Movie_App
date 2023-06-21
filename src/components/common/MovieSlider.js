import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useCallbackRef } from 'use-callback-ref'
import { useQuery } from 'react-query'
import { get } from 'axios'
import Slider from 'react-slick'
import MovieCard from './MovieCard'
import Loader from './Loader'

const MovieSlider = ({ description, endpoint }) => {
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
    const sliderSettings = {
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
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
    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery(
        [ 'slider-query', endpoint ],
        async () => {
            const API_URL = process.env.REACT_APP_API_URL
            const API_TOKEN = process.env.REACT_APP_API_TOKEN
            const response = await get(`${API_URL}${endpoint}?api_key=${API_TOKEN}&language=en-US&page=1`)
            return response.data.results
        }
    )
    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return (
            <div className="page-container py-6 text-white">
                <h2 className="font-semibold mb-7">{description}</h2>
                <p>{`The content could not be loaded. ${error}.`}</p>
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
                <Slider {...sliderSettings} ref={sliderRef}>
                    {
                        data.map(({
                            id,
                            poster_path: posterPath,
                            title,
                            name
                        }) => (
                            <MovieCard
                                key={id}
                                id={id}
                                poster={posterPath}
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

MovieSlider.propTypes = {
    description: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired
}

export default MovieSlider

/* eslint-disable camelcase */
import Slider from 'react-slick'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNowPlayingMovies } from '../../redux/movies'
import BannerCard from './BannerCard'
import Loader from '../../common/Loader'

const MainBanner = () => {
    const dispatch = useDispatch()
    const sectionRef = useRef()
    const data = useSelector((state) => state.movies.movies.nowPlaying.movies)
    const dataStatus = useSelector((state) => state.movies.movies.nowPlaying.status)
    const settings = {
        arrows: false,
        infinite: false,
        speed: 500,
        initialSlide: 0
    }
    useEffect(() => {
        const setMaxWidthOnResize = () => {
            sectionRef.current.style.maxWidth = `${document.body.clientWidth}px`
        }

        setMaxWidthOnResize()
        window.addEventListener('resize', setMaxWidthOnResize)
        return () => window.removeEventListener('resize', setMaxWidthOnResize)
    }, [])
    useEffect(() => {
        dispatch(getNowPlayingMovies())
    }, [])
    return (
        <section ref={sectionRef}>
            {
                dataStatus === 'loading'
                    && <Loader inSlider={false} />
            }
            {
                data.length > 0 && dataStatus === 'idle'
                    && (
                        <Slider {...settings}>
                            {
                                data.map(({
                                    id,
                                    poster_path,
                                    backdrop_path,
                                    title,
                                    overview
                                }) => (
                                    <BannerCard
                                        key={id}
                                        id={id}
                                        poster={poster_path}
                                        background={backdrop_path}
                                        title={title}
                                        description={overview}
                                    />
                                ))
                            }
                        </Slider>
                    )
            }
        </section>
    )
}

export default MainBanner

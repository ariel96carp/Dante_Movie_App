import Slider from 'react-slick'
import { useCallbackRef } from 'use-callback-ref'
import { useQuery } from 'react-query'
import { get } from 'axios'
import HeroSlide from './HeroSlide'
import Loader from '../../common/Loader'

const HeroSlider = () => {
    const settings = {
        arrows: false,
        infinite: false,
        speed: 500,
        initialSlide: 0
    }
    const sectionRef = useCallbackRef(null, (newValue) => {
        if (!newValue) return () => {}
        const setMaxWidthOnResize = () => {
            newValue.style.maxWidth = `${document.body.clientWidth}px`
        }

        setMaxWidthOnResize()
        window.addEventListener('resize', setMaxWidthOnResize)
        return () => window.removeEventListener('resize', setMaxWidthOnResize)
    })
    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery(
        'hero-query',
        async () => {
            const API_URL = process.env.REACT_APP_API_URL
            const API_TOKEN = process.env.REACT_APP_API_TOKEN
            const response = await get(`${API_URL}/movie/now_playing?api_key=${API_TOKEN}&language=en-US&page=1`)
            return response.data.results
        }
    )
    if (isLoading) {
        return <Loader inSlider={false} />
    }
    if (isError) {
        return (
            <div className="page-container pt-[var(--header-size)]">
                <p className="text-white py-6">
                    {`${error}.`}
                </p>
            </div>
        )
    }
    return (
        <section ref={sectionRef}>
            <Slider {...settings}>
                {
                    data.map(({
                        id,
                        poster_path: posterPath,
                        backdrop_path: backdropPath,
                        title,
                        overview
                    }) => (
                        <HeroSlide
                            key={id}
                            id={id}
                            poster={posterPath}
                            background={backdropPath}
                            title={title}
                            description={overview}
                        />
                    ))
                }
            </Slider>
        </section>
    )
}

export default HeroSlider

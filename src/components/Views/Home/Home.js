import { useContext, useEffect } from 'react'
import MainBanner from './MainBanner'
import FilmSlider from '../../common/FilmSlider'
import VideoContext from '../../context/VideoContext'
import TrailerModal from './TrailerModal'

const Home = () => {
    const { openModal } = useContext(VideoContext)
    useEffect(() => {
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    return (
        <>
            {
                openModal && <TrailerModal />
            }
            <MainBanner />
            <FilmSlider
                description="Upcoming movies"
                type="Upcoming Movies"
            />
            <FilmSlider
                description="Top rated movies"
                type="Top Rated Movies"
            />
            <FilmSlider
                description="Popular TV"
                type="Popular Series"
            />
            <FilmSlider
                description="Top rated TV"
                type="Top Rated Series"
            />
        </>
    )
}

export default Home

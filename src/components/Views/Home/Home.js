import { useContext } from 'react'
import HeroSlider from './HeroSlider'
import MovieSlider from '../../common/MovieSlider'
import VideoContext from '../../../context/VideoContext'
import TrailerModal from './TrailerModal'

const Home = () => {
    const { openModal } = useContext(VideoContext)
    return (
        <>
            {
                openModal && <TrailerModal />
            }
            <HeroSlider />
            <MovieSlider
                description="Upcoming movies"
                endpoint="/movie/upcoming"
            />
            <MovieSlider
                description="Top rated movies"
                endpoint="/movie/top_rated"
            />
            <MovieSlider
                description="Popular TV"
                endpoint="/tv/popular"
            />
            <MovieSlider
                description="Top rated TV"
                endpoint="/tv/top_rated"
            />
        </>
    )
}

export default Home

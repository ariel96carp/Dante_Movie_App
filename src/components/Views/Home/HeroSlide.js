import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import VideoContext from '../../../context/VideoContext'

const HeroSlide = ({
    background,
    poster,
    title,
    description,
    id
}) => {
    const { ref } = useInView({
        onChange: (inView, entry) => {
            const slidePoster = entry.target.querySelector('img')
            const slideText = entry.target.querySelector('.slide-text')
            switch (true) {
                case inView:
                    slidePoster.classList.add('!scale-100')
                    slideText.classList.add('slide-text-animate')
                    break
                default:
                    slidePoster.classList.remove('!scale-100')
                    slideText.classList.remove('slide-text-animate')
            }
        },
        threshold: 0.8
    })
    const { setOpenModal, setVideoURL } = useContext(VideoContext)
    const getVideoURL = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US`)
        if (response.status === 200) {
            const dataResponse = await response.json()
            if (dataResponse.results.length > 0) {
                const videoURL = dataResponse.results.find((video) => video.site.toLocaleLowerCase() === 'youtube')
                setOpenModal(true)
                setVideoURL(videoURL.key)
            }
        }
    }
    return (
        <article
            className="bg-no-repeat bg-center bg-cover bg-zinc-600 bg-blend-multiply banner-shadow relative h-[500px] sm:h-auto"
            style={{ backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}${background}')` }}
            ref={ref}
        >
            <div className="page-container pt-[var(--header-size)]">
                <div className="py-10 sm:py-12 grid sm:grid-cols-[3fr,2fr] gap-3">
                    <div className="text-white slide-text">
                        <h1 className="font-bold text-6xl mb-8">{title}</h1>
                        <p className="text-sm mb-8">{description}</p>
                        <div className="flex gap-3">
                            <Link
                                to={`/movies/${id}`}
                                className="btn alt"
                            >
                                Watch now
                            </Link>
                            <button
                                type="button"
                                className="btn hover-effect"
                                onClick={getVideoURL}
                            >
                                Watch trailer
                            </button>
                        </div>
                    </div>
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${poster}`}
                        alt="Poster de Serie"
                        loading="lazy"
                        className="lg:w-[60%] rounded-xl shadow-lg shadow-white/20 !hidden sm:!block scale-0 transition-transform duration-500"
                    />
                </div>
            </div>
        </article>
    )
}

HeroSlide.propTypes = {
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default HeroSlide

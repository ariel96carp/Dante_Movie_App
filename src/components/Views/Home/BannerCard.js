import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import VideoContext from '../../context/VideoContext'

const BannerCard = ({
    background,
    poster,
    title,
    description,
    id
}) => {
    const { setOpenModal, setVideoURL } = useContext(VideoContext)
    const getVideoURL = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US`)
        if (response.status === 200) {
            const dataResponse = await response.json()
            const videoURL = dataResponse.results.find((video) => video.site.toLocaleLowerCase() === 'youtube')
            setOpenModal(true)
            setVideoURL(videoURL.key)
        }
    }
    return (
        <article
            className="bg-no-repeat bg-center bg-cover bg-zinc-900 bg-blend-multiply banner-shadow relative h-[500px] sm:h-auto"
            style={{ backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}${background}')` }}
        >
            <div className="page-container pt-[var(--header-size)]">
                <div className="py-10 sm:py-12 grid sm:grid-cols-[3fr,2fr] gap-3">
                    <div className="text-white">
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
                        className="lg:w-[60%] rounded-xl shadow-lg shadow-white/20 !hidden sm:!block"
                    />
                </div>
            </div>
        </article>
    )
}

BannerCard.propTypes = {
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default BannerCard

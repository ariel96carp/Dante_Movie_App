import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import errorImage from '../../assets/img/no-image.png'

const FilmCard = ({
    poster,
    title,
    name,
    inSlider = true,
    id
}) => (
    <Link to={`${title ? `/movies/${id}` : `/series/${id}`}`}>
        <div className={`${inSlider && 'film-card group'}`}>
            <article className="h-[280px] w-full mb-2 relative">
                <img
                    src={`${poster ? `${process.env.REACT_APP_IMAGE_URL}${poster}` : errorImage}`}
                    alt="Poster de Película"
                    loading="lazy"
                    className="w-full h-full object-cover object-center rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/60 rounded-2xl transition-opacity opacity-0 card-back-effect" />
            </article>
            <h3
                className="text-sm font-semibold card-text-effect transition-[color]"
            >
                {title || name}
            </h3>
        </div>
    </Link>
)

FilmCard.propTypes = {
    id: PropTypes.number.isRequired,
    poster: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    inSlider: PropTypes.bool
}

export default FilmCard

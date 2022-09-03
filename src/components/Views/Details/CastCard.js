import PropTypes from 'prop-types'

const CastCard = ({ image, cast }) => (
    <div>
        <img
            src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
            alt="Cast"
            loading="lazy"
            className="w-full h-40 object-cover object-center mb-2"
        />
        <p className="font-medium text-sm">{cast}</p>
    </div>
)

CastCard.propTypes = {
    image: PropTypes.string.isRequired,
    cast: PropTypes.string.isRequired
}

export default CastCard

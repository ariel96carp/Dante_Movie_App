import PropTypes from 'prop-types'

const Loader = ({ inSlider = true }) => (
    <div className={`page-container ${!inSlider && 'pt-[var(--header-size)]'}`}>
        <p className="text-white py-6">Loading content...</p>
    </div>
)

Loader.propTypes = {
    inSlider: PropTypes.bool
}

export default Loader

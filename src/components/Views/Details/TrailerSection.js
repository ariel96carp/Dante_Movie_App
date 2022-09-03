import PropTypes from 'prop-types'
import YouTube from 'react-youtube'

const TrailerSection = ({ url, title }) => (
    <div className="text-white py-8 sm:py-10">
        <h2 className="font-semibold text-lg mb-4 capitalize">{title}</h2>
        <YouTube
            videoId={url}
            className="relative grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(9,1fr)] after:content-[''] after:block after:pb-[100%]"
            iframeClassName="absolute w-full h-full"
        />
    </div>
)

TrailerSection.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default TrailerSection

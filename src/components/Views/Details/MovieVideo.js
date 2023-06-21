/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { MediaPlayer, MediaOutlet } from '@vidstack/react'
import 'vidstack/styles/base.css'

const MovieVideo = ({ url, title }) => (
    <div className="text-white py-8 sm:py-10">
        <h2 className="font-semibold text-lg mb-4 capitalize">{title}</h2>
        <MediaPlayer
            src="https://media-files.vidstack.io/720p.mp4"
            poster="https://media-files.vidstack.io/poster.png"
            controls
        >
            <MediaOutlet />
        </MediaPlayer>
    </div>
)

MovieVideo.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default MovieVideo

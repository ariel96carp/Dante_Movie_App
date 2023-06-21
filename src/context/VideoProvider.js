import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import VideoContext from './VideoContext'

const VideoProvider = ({ children }) => {
    const [ openModal, setOpenModal ] = useState(false)
    const [ videoURL, setVideoURL ] = useState('')
    const value = useMemo(() => ({
        openModal,
        setOpenModal,
        videoURL,
        setVideoURL
    }), [ openModal, setOpenModal, videoURL, setVideoURL ])
    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    )
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default VideoProvider

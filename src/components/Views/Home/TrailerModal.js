import { useContext } from 'react'
import YouTube from 'react-youtube'
import VideoContext from '../../context/VideoContext'

const TrailerModal = () => {
    const { setOpenModal, videoURL } = useContext(VideoContext)
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] bg-black/80 z-50">
            <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="absolute top-6 right-6"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white font-semibold"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
                </svg>
            </button>
            <div className="page-container flex justify-center items-center h-full">
                <div className="w-full sm:w-[80%] lg:w-[70%] bg-zinc-900 p-2 sm:p-3">
                    <YouTube
                        videoId={videoURL}
                        className="relative grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(9,1fr)] after:content-[''] after:block after:pb-[100%]"
                        iframeClassName="absolute w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default TrailerModal

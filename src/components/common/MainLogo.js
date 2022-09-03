import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import movieImage from '../../assets/img/tmovie.png'

const MainLogo = ({ isLink = true }) => {
    if (isLink) {
        return (
            <Link to="/">
                <div className="inline-flex gap-2 items-center">
                    <img
                        src={movieImage}
                        alt="Logo"
                        className="w-10"
                    />
                    <h2 className="font-bold text-2xl text-white">tMovies</h2>
                </div>
            </Link>
        )
    }
    return (
        <div className="inline-flex gap-2 items-center">
            <img
                src={movieImage}
                alt="Logo"
                className="w-10"
            />
            <h2 className="font-bold text-2xl">tMovies</h2>
        </div>
    )
}

MainLogo.propTypes = {
    isLink: PropTypes.bool
}

export default MainLogo

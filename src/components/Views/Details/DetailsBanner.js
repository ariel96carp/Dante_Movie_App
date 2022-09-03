/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import CastCard from './CastCard'
import TrailerSection from './TrailerSection'

const DetailsBanner = ({
    title,
    showName,
    description,
    genres,
    background,
    poster,
    credits,
    videos
}) => (
    <section
        className="bg-no-repeat bg-cover bg-top bg-zinc-900 bg-blend-multiply relative banner-shadow details"
        style={{ backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}${background}')` }}
    >
        <div className="page-container pt-[var(--header-size)] relative z-10">
            <div className="sm:w-[90%] lg:w-[70%] mx-auto">
                <article className="grid md:grid-cols-[2fr,3fr] gap-6 pt-10 sm:pt-16 text-white">
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${poster}`}
                        alt="Poster de Película"
                        loading="lazy"
                        className="rounded-xl w-full hidden md:block"
                    />
                    <div>
                        <h1 className="font-bold text-5xl mb-5 sm:mb-7 leading-tight">{title || showName}</h1>
                        <div className="flex gap-3 flex-wrap mb-4">
                            {
                                genres.map(({
                                    id,
                                    name
                                }) => (
                                    <div
                                        key={id}
                                        className="btn text-xs px-5"
                                    >
                                        {name}
                                    </div>
                                ))
                            }
                        </div>
                        <p className="text-sm mb-7">
                            {description}
                        </p>
                        {
                            credits.length > 0
                                && (
                                    <>
                                        <h2 className="font-semibold text-lg mb-1">Casts</h2>
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                                            {
                                                credits.slice(0, 10).filter(
                                                    (cast) => cast.profile_path
                                                ).map(({
                                                    id,
                                                    profile_path,
                                                    name
                                                }) => (
                                                    <CastCard
                                                        key={id}
                                                        image={profile_path}
                                                        cast={name}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </>
                                )
                        }
                    </div>
                </article>
            </div>
            {
                videos.slice(0, 2).filter(
                    (video) => video.site.toLocaleLowerCase() === 'youtube'
                ).map(({
                    id,
                    name,
                    key
                }) => (
                    <TrailerSection
                        key={id}
                        title={name}
                        url={key}
                    />
                ))
            }
        </div>
    </section>
)

DetailsBanner.propTypes = {
    title: PropTypes.string,
    showName: PropTypes.string,
    description: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        genre: PropTypes.string
    })).isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    credits: PropTypes.arrayOf(PropTypes.shape({
        adult: PropTypes.bool,
        gender: PropTypes.number,
        known_for_department: PropTypes.string,
        name: PropTypes.string,
        original_name: PropTypes.string,
        popularity: PropTypes.number,
        profile_path: PropTypes.string,
        cast_id: PropTypes.number,
        character: PropTypes.string,
        credit_id: PropTypes.string,
        order: PropTypes.number
    })).isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({
        iso_639_1: PropTypes.string,
        iso_3166_1: PropTypes.string,
        name: PropTypes.string,
        key: PropTypes.string,
        site: PropTypes.string,
        size: PropTypes.number,
        type: PropTypes.string,
        official: PropTypes.bool,
        published_at: PropTypes.string,
        id: PropTypes.string
    }))
}

export default DetailsBanner

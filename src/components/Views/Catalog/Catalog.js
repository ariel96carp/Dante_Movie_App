/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useParams } from 'react-router-dom'
import { searchSeries, getPopularSeriesOnCatalog, cleanSerieCatalog } from '../../redux/series'
import { searchMovies, getUpcomingMoviesOnCatalog, cleanMovieCatalog } from '../../redux/movies'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import Loader from '../../common/Loader'
import FilmCard from '../../common/FilmCard'
import CatalogSearch from './CatalogSearch'

const Catalog = () => {
    const { category, keyword } = useParams()
    const dispatch = useDispatch()
    const [ page, setPage ] = useState(1)
    const data = useSelector((state) => {
        switch (category) {
            case 'movies':
                return state.movies.movies.catalog.movies
            default:
                return state.series.series.catalog.series
        }
    })
    const dataStatus = useSelector((state) => {
        switch (category) {
            case 'movies':
                return state.movies.movies.catalog.status
            default:
                return state.series.series.catalog.status
        }
    })
    const totalPages = useSelector((state) => {
        switch (category) {
            case 'movies':
                return state.movies.movies.catalog.totalPages
            default:
                return state.series.series.catalog.totalPages
        }
    })
    const loadCatalog = (onClick = false) => {
        const emptyKeywordParam = !onClick ? 1 : page + 1
        const searchParams = {
            query: keyword,
            page: !onClick ? 1 : page + 1
        }
        if (!keyword) {
            switch (category) {
                case 'movies':
                    dispatch(getUpcomingMoviesOnCatalog(emptyKeywordParam))
                    break
                default:
                    dispatch(getPopularSeriesOnCatalog(emptyKeywordParam))
            }
        } else {
            switch (category) {
                case 'movies':
                    dispatch(searchMovies(searchParams))
                    break
                default:
                    dispatch(searchSeries(searchParams))
            }
        }
        if (onClick) setPage((prevPage) => prevPage + 1)
        else setPage(1)
    }
    useEffect(() => {
        loadCatalog()
        switch (category) {
            case 'movies':
                return () => dispatch(cleanMovieCatalog())
            default:
                return () => dispatch(cleanSerieCatalog())
        }
    }, [ category, keyword ])
    useSmoothScroll([ category, keyword ])
    return (
        <section
            className="bg-[url('./assets/img/footer-bg.jpg')] bg-no-repeat bg-top relative banner-shadow searcher"
        >
            <div className="page-container pt-[var(--header-size)] relative z-10">
                <div className="py-10 sm:py-14 text-white">
                    <h2 className="font-semibold text-center text-xl mb-8 sm:mb-12 capitalize">{category}</h2>
                    <CatalogSearch />
                    {
                        dataStatus === 'loading'
                            && <Loader />
                    }
                    {
                        data.length > 0 && dataStatus === 'idle'
                            && (
                                <>
                                    <div
                                        className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 mb-8"
                                    >
                                        {
                                            data.map(({
                                                id,
                                                poster_path,
                                                title,
                                                name
                                            }, index) => (
                                                <FilmCard
                                                    key={`${id}${index}`}
                                                    id={id}
                                                    poster={poster_path}
                                                    title={title}
                                                    name={name}
                                                />
                                            ))
                                        }
                                    </div>
                                    <button
                                        type="button"
                                        className={`btn mx-auto hover-effect block ${page >= totalPages && 'pointer-events-none opacity-40'}`}
                                        onClick={() => loadCatalog(true)}
                                    >
                                        Load more
                                    </button>
                                </>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default Catalog

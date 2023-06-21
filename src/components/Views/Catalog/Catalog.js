/* eslint-disable max-len */
import { useParams } from 'react-router-dom'
import { get } from 'axios'
import { useInfiniteQuery } from 'react-query'
import Loader from '../../common/Loader'
import MovieCard from '../../common/MovieCard'
import CatalogSearch from './CatalogSearch'

const Catalog = () => {
    const { category, keyword } = useParams()
    const {
        isLoading,
        data,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        [ 'catalog-query', category ],
        async ({ pageParam = 1 }) => {
            const CATALOG_ENDPOINTS = [
                { type: 'movies', endpoint: '/movie/upcoming', params: false },
                { type: 'series', endpoint: '/tv/popular', params: false },
                { type: 'movies', endpoint: '/search/movie', params: true },
                { type: 'series', endpoint: '/search/tv', params: true }
            ]
            const WITH_PARAMS = Boolean(keyword)
            const API_URL = process.env.REACT_APP_API_URL
            const API_TOKEN = process.env.REACT_APP_API_TOKEN
            const filteredEndpoints = CATALOG_ENDPOINTS.filter((endpoint) => endpoint.type === category)
            const apiEndpoint = filteredEndpoints.find((endpoint) => endpoint.params === WITH_PARAMS).endpoint
            const response = await get(`${API_URL}${apiEndpoint}?api_key=${API_TOKEN}&append_to_response=videos,credits&language=en-US&page=${pageParam}`)
            return response.data
        },
        {
            getNextPageParam: (lastPage) => {
                if (!(lastPage.page < lastPage.total_pages)) return false
                return lastPage.page + 1
            }
        }
    )
    return (
        <section
            className="bg-[url('./assets/img/footer-bg.jpg')] bg-no-repeat bg-top relative banner-shadow searcher"
        >
            <div className="page-container pt-[var(--header-size)] relative z-10">
                <div className="py-10 sm:py-14 text-white">
                    <h2 className="font-semibold text-center text-xl mb-8 sm:mb-12 capitalize">{category}</h2>
                    <CatalogSearch />
                    {
                        isLoading && <Loader />
                    }
                    {
                        data
                            && (
                                <>
                                    <div
                                        className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 mb-8"
                                    >
                                        {
                                            data.pages.map((page) => (
                                                page.results.map(({
                                                    id,
                                                    poster_path: posterPath,
                                                    title,
                                                    name
                                                }, index) => (
                                                    <MovieCard
                                                        key={`${id}${index}`}
                                                        id={id}
                                                        poster={posterPath}
                                                        title={title}
                                                        name={name}
                                                    />
                                                ))
                                            ))
                                        }
                                    </div>
                                    <button
                                        type="button"
                                        className={`btn mx-auto hover-effect block ${!hasNextPage && 'pointer-events-none opacity-40'}`}
                                        onClick={fetchNextPage}
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

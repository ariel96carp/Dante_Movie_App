import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTopRatedMovies = createAsyncThunk('movies/getTopRatedMovies', async (arg, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getUpcomingMovies = createAsyncThunk('movies/getUpcomingMovies', async (arg, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getSimilarMovies = createAsyncThunk('movies/getSimilarMovies', async (id, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getMovie = createAsyncThunk('movies/getMovie', async (id, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&append_to_response=videos,credits`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getNowPlayingMovies = createAsyncThunk('movies/getNowPlayingMovies', async (arg, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const searchMovies = createAsyncThunk('movies/searchMovie', async ({ query, page }, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&query=${query}&page=${page}`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getUpcomingMoviesOnCatalog = createAsyncThunk('movies/getUpcomingMoviesOnCatalog', async (page, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=${page}`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

const initialState = {
    movies: {
        topRated: {
            movies: [],
            status: 'idle'
        },
        upcoming: {
            movies: [],
            status: 'idle'
        },
        selected: {
            movie: [],
            similar: [],
            movieStatus: 'idle',
            similarStatus: 'idle'
        },
        catalog: {
            movies: [],
            totalPages: 0,
            status: 'idle'
        },
        nowPlaying: {
            movies: [],
            status: 'idle'
        }
    }
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        cleanMovieCatalog: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    ...state.movies.catalog,
                    movies: initialState.movies.catalog.movies
                }
            }
        })
    },
    extraReducers: {
        [getTopRatedMovies.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                topRated: {
                    ...state.movies.topRated,
                    status: 'loading'
                }
            }
        }),
        [getTopRatedMovies.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                topRated: {
                    movies: action.payload.results,
                    status: 'idle'
                }
            }
        }),
        [getTopRatedMovies.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                topRated: {
                    ...state.movies.topRated,
                    status: 'rejected'
                }
            }
        }),
        [getUpcomingMovies.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                upcoming: {
                    ...state.movies.upcoming,
                    status: 'loading'
                }
            }
        }),
        [getUpcomingMovies.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                upcoming: {
                    status: 'idle',
                    movies: action.payload.results
                }
            }
        }),
        [getUpcomingMovies.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                upcoming: {
                    ...state.movies.upcoming,
                    status: 'rejected'
                }
            }
        }),
        [getMovie.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    movieStatus: 'loading'
                }
            }
        }),
        [getMovie.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    movieStatus: 'idle',
                    movie: [action.payload]
                }
            }
        }),
        [getMovie.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    movieStatus: 'rejected'
                }
            }
        }),
        [getSimilarMovies.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    similarStatus: 'loading'
                }
            }
        }),
        [getSimilarMovies.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    similarStatus: 'idle',
                    similar: action.payload.results
                }
            }
        }),
        [getSimilarMovies.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                selected: {
                    ...state.movies.selected,
                    similarStatus: 'rejected'
                }
            }
        }),
        [getNowPlayingMovies.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                nowPlaying: {
                    ...state.movies.nowPlaying,
                    status: 'loading'
                }
            }
        }),
        [getNowPlayingMovies.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                nowPlaying: {
                    movies: action.payload.results,
                    status: 'idle'
                }
            }
        }),
        [getUpcomingMoviesOnCatalog.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    ...state.movies.catalog,
                    status: 'loading'
                }
            }
        }),
        [getUpcomingMoviesOnCatalog.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    movies: state.movies.catalog.movies.concat(action.payload.results),
                    totalPages: action.payload.total_pages,
                    status: 'idle'
                }
            }
        }),
        [getUpcomingMoviesOnCatalog.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    ...state.movies.catalog,
                    status: 'rejected'
                }
            }
        }),
        [searchMovies.pending]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    ...state.movies.catalog,
                    status: 'loading'
                }
            }
        }),
        [searchMovies.fulfilled]: (state, action) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    movies: state.movies.catalog.movies.concat(action.payload.results),
                    totalPages: action.payload.total_pages,
                    status: 'idle'
                }
            }
        }),
        [searchMovies.rejected]: (state) => ({
            ...state,
            movies: {
                ...state.movies,
                catalog: {
                    ...state.movies.catalog,
                    status: 'rejected'
                }
            }
        })
    }
})

export default moviesSlice.reducer
export const { cleanMovieCatalog } = moviesSlice.actions

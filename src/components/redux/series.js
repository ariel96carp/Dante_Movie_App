import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTopRatedSeries = createAsyncThunk('series/getTopRatedSeries', async (arg, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getPopularSeries = createAsyncThunk('series/getPopularSeries', async (arg, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tv/popular?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getSimilarSeries = createAsyncThunk('series/getSimilarSeries', async (id, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tv/${id}/similar?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=1`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getPopularSeriesOnCatalog = createAsyncThunk('series/getPopularSeriesOnCatalog', async (page, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tv/popular?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&page=${page}`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const getSerie = createAsyncThunk('series/getSerie', async (id, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&append_to_response=videos,credits`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

export const searchSeries = createAsyncThunk('series/searchSerie', async ({ query, page }, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search/tv?api_key=${process.env.REACT_APP_API_TOKEN}&language=en-US&query=${query}&page=${page}`)
    if (response.status === 200) return response.json()
    const errorData = await response.json()
    return rejectWithValue(errorData)
})

const initialState = {
    series: {
        topRated: {
            series: [],
            status: 'idle'
        },
        popular: {
            series: [],
            status: 'idle'
        },
        selected: {
            serie: [],
            similar: [],
            serieStatus: 'idle',
            similarStatus: 'idle'
        },
        catalog: {
            series: [],
            totalPages: 0,
            status: 'idle'
        }
    }
}

const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {
        cleanSerieCatalog: (state) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    ...state.series.catalog,
                    series: initialState.series.catalog.series
                }
            }
        })
    },
    extraReducers: {
        [getTopRatedSeries.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                topRated: {
                    ...state.series.topRated,
                    status: 'loading'
                }
            }
        }),
        [getTopRatedSeries.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                topRated: {
                    series: action.payload.results,
                    status: 'idle'
                }
            }
        }),
        [getTopRatedSeries.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                topRated: {
                    ...state.series.topRated,
                    status: 'rejected'
                }
            }
        }),
        [getPopularSeries.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                popular: {
                    ...state.series.popular,
                    status: 'loading'
                }
            }
        }),
        [getPopularSeries.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                popular: {
                    status: 'idle',
                    series: action.payload.results
                }
            }
        }),
        [getPopularSeries.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                popular: {
                    ...state.series.popular,
                    status: 'rejected'
                }
            }
        }),
        [getSerie.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    serieStatus: 'loading'
                }
            }
        }),
        [getSerie.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    serieStatus: 'idle',
                    serie: [action.payload]
                }
            }
        }),
        [getSerie.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    serieStatus: 'rejected'
                }
            }
        }),
        [getSimilarSeries.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    similarStatus: 'loading'
                }
            }
        }),
        [getSimilarSeries.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    similarStatus: 'idle',
                    similar: action.payload.results
                }
            }
        }),
        [getSimilarSeries.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                selected: {
                    ...state.series.selected,
                    similarStatus: 'rejected'
                }
            }
        }),
        [getPopularSeriesOnCatalog.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    ...state.series.catalog,
                    status: 'loading'
                }
            }
        }),
        [getPopularSeriesOnCatalog.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    series: state.series.catalog.series.concat(action.payload.results),
                    totalPages: action.payload.total_pages,
                    status: 'idle'
                }
            }
        }),
        [getPopularSeriesOnCatalog.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    ...state.series.catalog,
                    status: 'rejected'
                }
            }
        }),
        [searchSeries.pending]: (state) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    ...state.series.catalog,
                    status: 'loading'
                }
            }
        }),
        [searchSeries.fulfilled]: (state, action) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    series: state.series.catalog.series.concat(action.payload.results),
                    totalPages: action.payload.total_pages,
                    status: 'idle'
                }
            }
        }),
        [searchSeries.rejected]: (state) => ({
            ...state,
            series: {
                ...state.series,
                catalog: {
                    ...state.series.catalog,
                    status: 'rejected'
                }
            }
        })
    }
})

export default seriesSlice.reducer
export const { cleanSerieCatalog } = seriesSlice.actions

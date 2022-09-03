import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './movies'
import seriesReducer from './series'

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        series: seriesReducer
    }
})

export default store

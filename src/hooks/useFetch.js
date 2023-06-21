import { get } from 'axios'
import { useEffect, useReducer } from 'react'

const types = {
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    RESET_STATE: 'RESET_STATE'
}

const initialState = {
    data: null,
    loading: true,
    error: null
}

const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case types.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }
        case types.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case types.RESET_STATE:
            return initialState
        default:
            return state
    }
}

const useFetch = ({ endpoint, params, page = 1 }) => {
    const [ state, dispatch ] = useReducer(dataReducer, initialState)
    useEffect(() => {
        dispatch({ type: types.RESET_STATE })
        const URLParams = params ? `${params}&language=en-US&page=${page}` : `&language=en-US&page=${page}`
        get(`${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_TOKEN}${URLParams}`)
            .then(({ data }) => {
                dispatch({
                    type: types.FETCH_SUCCESS,
                    payload: data.results ? data.results : [ data ]
                })
            })
            .catch((err) => dispatch({ type: types.FETCH_ERROR, payload: err.message }))
    }, [ endpoint ])

    return state
}

export default useFetch

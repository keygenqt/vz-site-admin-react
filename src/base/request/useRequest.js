import {useEffect, useReducer, useRef} from "react";
import PropTypes from "prop-types";

/**
 * Request reducer
 *
 * @param method
 * @param delay
 * @return {never}
 */
export const useRequest = (method, delay = 0) => {

    const key = method.toString()

    const initialState = {
        status: 'idle',
        loading: true,
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return {...initialState, status: 'fetching', loading: true};
            case 'FETCHED':
                return {...initialState, status: 'fetched', data: action.payload, loading: false};
            case 'FETCH_ERROR':
                return {...initialState, status: 'error', error: action.payload, loading: false};
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        let cancelRequest = false;
        if (!key) return;

        const fetchData = async () => {
            if (localStorage.getItem(key)) {
                const data = JSON.parse(localStorage.getItem(key));
                dispatch({type: 'FETCHED', payload: data});
            } else {
                dispatch({type: 'FETCHING'});
                try {
                    if (delay) {
                        await new Promise(r => setTimeout(r, delay));
                    }
                    const response = await method()
                    localStorage.setItem(key, JSON.stringify(response))
                    if (cancelRequest) return;
                    dispatch({type: 'FETCHED', payload: response});
                } catch (error) {
                    if (cancelRequest) return;
                    dispatch({type: 'FETCH_ERROR', payload: error});
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [key, delay]);

    return state;
}

useRequest.propTypes = {
    method: PropTypes.func.isRequired,
    delay: PropTypes.number,
};
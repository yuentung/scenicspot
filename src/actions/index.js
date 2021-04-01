import {
    RESET_SPOTS,
    FETCH_SPOTS,
    SET_CITY,
    RESET_PAGE_NUMBER,
    INCREMENT_PAGE_NUMBER,
    RESET_ERROR_MESSAGE,
    SET_ERROR_MESSAGE,
    SET_LOADING,
    SET_HAS_MORE
} from './types';
import tourism from '../api/tourism';

export const resetSpots = () => {
    return { type: RESET_SPOTS };
};

export const fetchSpots = (city, pageNumber) => async dispatch => {
    dispatch(setLoading(true));
    try {
        dispatch(resetErrorMessage());
        const response = await tourism.get(`/v2/Tourism/ScenicSpot${city === 'All' ? '' : `/${city}`}`, {
            params: {
                $top: 30,
                $skip: (pageNumber - 1) * 30
            }
        });
        dispatch({ type: FETCH_SPOTS, payload: response.data });
        dispatch(setHasMore(response.data.length === 30));
    } catch (e) {
        dispatch(setErrorMessage(e.response.statusText));
    }
    dispatch(setLoading(false));
};

export const setCity = city => {
    return { type: SET_CITY, payload: city };
};

export const resetPageNumber = () => {
    return { type: RESET_PAGE_NUMBER };
};

export const incrementPageNumber = () => {
    return { type: INCREMENT_PAGE_NUMBER };
};

export const resetErrorMessage = () => {
    return { type: RESET_ERROR_MESSAGE };
};

export const setErrorMessage = errorMessage => {
    return { type: SET_ERROR_MESSAGE, payload: errorMessage };
};

export const setLoading = loading => {
    return { type: SET_LOADING, payload: loading };
};

export const setHasMore = hasMore => {
    return { type: SET_HAS_MORE, payload: hasMore };
};

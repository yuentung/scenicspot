import { combineReducers } from 'redux';
import _ from 'lodash';
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
} from '../actions/types';

const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_SPOTS:
            return {};
        case FETCH_SPOTS:
            return { ...state, ..._.mapKeys(action.payload, 'ID') };
        default:
            return state;
    }
};

const cityReducer = (state = '', action) => {
    switch (action.type) {
        case SET_CITY:
            return action.payload;
        default:
            return state;
    }
};

const pageNumberReducer = (state = 1, action) => {
    switch (action.type) {
        case RESET_PAGE_NUMBER:
            return 1;
        case INCREMENT_PAGE_NUMBER:
            return state + 1;
        default:
            return state;
    }
};

const errorMessageReducer = (state = '', action) => {
    switch (action.type) {
        case RESET_ERROR_MESSAGE:
            return '';
        case SET_ERROR_MESSAGE:
            return `錯誤：${action.payload}`;
        default:
            return state;
    }
};

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};

const hasMoreReducer = (state = false, action) => {
    switch (action.type) {
        case SET_HAS_MORE:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    'spots': spotsReducer,
    'city': cityReducer,
    'pageNumber': pageNumberReducer,
    'errorMessage': errorMessageReducer,
    'loading': loadingReducer,
    'hasMore': hasMoreReducer
});

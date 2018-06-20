import * as types from './../constants/types'

const initialState = {
    data: null
}

export function form(state = initialState, action){
    switch(action.type){
        case types.PARSE_DATA_LOADED:
        return {
            ...state,
            type: types.PARSE_DATA_LOADED,
            data: action.payLoad
        }
        case types.CONTAINS_DATA_LOADED:
        return {
            ...state,
            type: types.CONTAINS_DATA_LOADED,
            data: action.payLoad
        }
        default:
        return state;
    }
}
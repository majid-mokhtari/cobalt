import * as types from '../constants/types';

export function onServerError(err) {
    return {
        type: types.SERVER_ERROR,
        err,
    };
}
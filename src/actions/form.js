import { Rest } from '../lib/rest'
import * as util from '../lib/util'

const parseUrl = `/parse`
const containsUrl = `/contains`

export function parse(request) {
  return dispatch => {    
    dispatch(loading())
    return Rest.post(parseUrl, request)
    .then(res => res.json())
    .then(res => {
          return dispatch(onSubmitParseSuccess(res))
      }).catch(err => {
        return dispatch(util.onServerError(err));
      });
  }
}

export function contains(request) {
  return dispatch => {    
    dispatch(loading())
    return Rest.post(containsUrl, request)
    .then(res => res.json())
    .then(res => {
          return dispatch(onSubmitContainsSuccess(res))
      }).catch(err => {
        return dispatch(util.onServerError(err));
      });
  }
}

function loading() {
  return {
    type: "LOADING_DATA"
  }
}

function onSubmitParseSuccess(payLoad) {
  return {
    type: "PARSE_DATA_LOADED",
    payLoad
  }
}

function onSubmitContainsSuccess(payLoad) {
  return {
    type: "CONTAINS_DATA_LOADED",
    payLoad
  }
}

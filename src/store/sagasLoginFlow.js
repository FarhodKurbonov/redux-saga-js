
import {LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from "./actions";
import * as userApi from '../api/user'
import {fork, take, call, put} from "@redux-saga/core/effects";

function* authorize(username, password ) {

  try {
    const token = yield call(userApi.login, username, password)
    yield put({type: LOGIN_SUCCESS,  payload: {token: token}})
    yield call(userApi.saveToken, token)
  } catch (e) {
    yield put({type: LOGIN_ERROR,  payload: {error: e.message}})
  }

}

export function* loginFlowSaga( ){
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    yield fork(authorize, payload.username, payload.password)
    yield take(LOGOUT)
    yield call(userApi.clearToken)
  }
}

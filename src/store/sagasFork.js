import {call, fork, put, spawn} from "@redux-saga/core/effects";
import {getUserAlbums} from "../api/albums";
import {SAVE_USER_ALBUMS, SAVE_USER_POSTS} from "./actions";
import {getUserPosts} from "../api/posts";


function* fetchUserPosts(userId) {
  const data = yield call(getUserPosts, userId)
  yield put({
    type: SAVE_USER_POSTS,
    payload: {data}
  })
}

function* fetchUserAlbums(userId) {
  const data = yield call(getUserAlbums, userId)
  yield put({
    type: SAVE_USER_ALBUMS,
    payload: { data,}
  })
}

function* fetchUserData(userId) {
  yield spawn(fetchUserAlbums, userId)
  yield spawn(fetchUserPosts, userId)
  console.info(`done`)
}

export function* forkSaga() {
  const userId = 1;
  yield call(fetchUserData, userId)
}

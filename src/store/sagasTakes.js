import {getUserPosts} from "../api/posts";
import {USER_POSTS_FETCH_FAILED, USER_POSTS_FETCH_REQUESTED, USER_POSTS_FETCH_SUCCEEDED} from "./actions";
import {call, put, takeEvery, takeLatest, takeMaybe, take} from "redux-saga/effects";


function* fetchUserPosts( action ) {
  try {
  const posts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: {
        data: posts
      }
    })
    console.info(`posts: ${posts.length}; action id: ${action.payload.actionId}`)
  } catch (e) {
    yield put({
      type: USER_POSTS_FETCH_FAILED, payload: { message: e}
    })
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  // yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)
  // yield takeMaybe(USER_POSTS_FETCH_REQUESTED, fetchUserPosts)

  while (true) {
    const acton = yield take (USER_POSTS_FETCH_REQUESTED)
    yield call(fetchUserPosts, acton)
  }
}

export function* takeSaga() {
  yield userPostsFetchRequestedWatcherSaga()
}

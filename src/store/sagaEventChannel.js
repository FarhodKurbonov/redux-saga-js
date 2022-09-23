import {createEventProvider} from "../api/eventProvider";
import {call} from "redux-saga/effects";
import {eventChannel} from "redux-saga";

const createEventProviderChannel =(eventProvider) => {
  return eventChannel ((emit) => {
    const pingHandler = (event) => {
      emit(event.payload)
    }
    eventProvider.subscribe(`ping`, pingHandler())
  })
}

export function* eventChannelSaga() {
  const eventProvider = yield call(createEventProvider)
  const eventProviderChannel = yield call(createEventProviderChannel, eventProvider)
}

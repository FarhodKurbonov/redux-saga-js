import {combineReducers} from 'redux';
import {appReducer} from "./appReducer";
import {loginFlowReducer} from "./loginFlowReducer";


export const rootReducer = combineReducers({
  app: appReducer,
  user: loginFlowReducer
})

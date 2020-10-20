import { combineReducers } from 'redux'
import videoListReducer from './videoListReducer';
 
const rootReducer = combineReducers({
     video: videoListReducer,

})
export default rootReducer;

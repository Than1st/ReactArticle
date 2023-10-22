import {combineReducers} from 'redux'
import AuthReducers from "./AuthReducers";
import ArticleReducers from "./ArticleReducers";

export default combineReducers({
    AuthReducers,
    ArticleReducers
})
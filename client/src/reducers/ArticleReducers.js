import {
    CREATE_ARTICLE, DELETE_ARTICLE,
    GET_ARTICLE,
    GET_DETAIL_ARTICLE,
    GET_USERS_ARTICLE,
    UPDATE_ARTICLE
} from "../actions/ArticleActions";

const initialState = {
    getArticleResult: false,
    getArticleLoading: false,
    getArticleError: false,

    getDetailArticleResult: false,
    getDetailArticleLoading: false,
    getDetailArticleError: false,

    createArticleResult: false,
    createArticleLoading: false,
    createArticleError: false,

    getUsersArticleResult: false,
    getUsersArticleLoading: false,
    getUsersArticleError: false,

    updateArticleResult: false,
    updateArticleLoading: false,
    updateArticleError: false,

    deleteArticleResult: false,
    deleteArticleLoading: false,
    deleteArticleError: false,
}
const ArticleReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                getArticleResult: action.payload.data,
                getArticleLoading: action.payload.loading,
                getArticleError: action.payload.errorMessage
            }
        case GET_DETAIL_ARTICLE:
            return {
                ...state,
                getDetailArticleResult: action.payload.data,
                getDetailArticleLoading: action.payload.loading,
                getDetailArticleError: action.payload.errorMessage
            }
        case CREATE_ARTICLE:
            return {
                ...state,
                createArticleResult: action.payload.data,
                createArticleLoading: action.payload.loading,
                createArticleError: action.payload.errorMessage
            }
            case GET_USERS_ARTICLE:
            return {
                ...state,
                getUsersArticleResult: action.payload.data,
                getUsersArticleLoading: action.payload.loading,
                getUsersArticleError: action.payload.errorMessage
            }
            case UPDATE_ARTICLE:
            return {
                ...state,
                updateArticleResult: action.payload.data,
                updateArticleLoading: action.payload.loading,
                updateArticleError: action.payload.errorMessage
            }
            case DELETE_ARTICLE:
            return {
                ...state,
                deleteArticleResult: action.payload.data,
                deleteArticleLoading: action.payload.loading,
                deleteArticleError: action.payload.errorMessage
            }
        default:
            return state
    }
}
export default ArticleReducers
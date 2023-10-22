import axios from "axios";

export const GET_ARTICLE = "GET_ARTICLE"
export const GET_DETAIL_ARTICLE = "GET_DETAIL_ARTICLE"
export const CREATE_ARTICLE = "CREATE_ARTICLE"
export const GET_USERS_ARTICLE = "GET_USERS_ARTICLE"
export const UPDATE_ARTICLE = "UPDATE_ARTICLE"
export const DELETE_ARTICLE = "DELETE_ARTICLE"
export const GetArticle = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:3000/article",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetDetailArticle = (params) => {
    return async (dispatch) => {
        dispatch({
            type: GET_DETAIL_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:3000/article/detail/"+params,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_DETAIL_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_DETAIL_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const CreateArticle = (data) => {
    return async (dispatch) => {
        dispatch({
            type: CREATE_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:3000/article/create",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: CREATE_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: CREATE_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetUserArticle = (params) => {
    return async (dispatch) => {
        dispatch({
            type: GET_USERS_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:3000/article/users/"+params,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_USERS_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_USERS_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdateArticle = (data, params) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:3000/article/update/"+params,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeleteArticle = (params) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_ARTICLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:3000/article/delete/"+params,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_ARTICLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_ARTICLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

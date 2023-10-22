import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GetArticle, GetDetailArticle} from "../actions/ArticleActions";

export const DetailArticle = () => {
    const params = useParams()
    const {
        getDetailArticleResult,
        getDetailArticleLoading,
        getDetailArticleError
    } = useSelector((state) => state.ArticleReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(getDetailArticleResult)
    useEffect(() => {
        dispatch(GetDetailArticle(params.id))
    }, []);
    return (
        <div className='container pt-5'>
            {
                getDetailArticleResult.length > 0 ? (
                    getDetailArticleResult.map((value) => {
                        const articleDate = new Date(value.createdAt)
                        return (
                            <div className="card mb-4 shadow-sm" key={value.id}>
                                <div className='card-body'>
                                    <div style={{fontSize: "13px"}}>
                                        <img className='rounded-circle me-2' style={{height: "35px", width: "35px"}}
                                             src={value.User.image}
                                             alt=''/> <Link to={'/about/'+value.User.id}><b>{value.User.username}</b></Link> <span className='badge bg-primary'>{value.User.role}</span> | {`${articleDate.getDate().toString().length === 1 ? '0' + articleDate.getDate() : articleDate.getDate()}-${articleDate.getMonth().toString().length === 1 ? '0' + articleDate.getMonth() : articleDate.getMonth()}-${articleDate.getFullYear()}
                                            `} {`${articleDate.getHours().toString().length === 1 ? '0' + articleDate.getHours() : articleDate.getHours()}:${articleDate.getMinutes().toString().length === 1 ? '0' + articleDate.getMinutes() : articleDate.getMinutes()}:${articleDate.getSeconds().toString().length === 1 ? '0' + articleDate.getSeconds() : articleDate.getSeconds()}`}
                                        <hr/>
                                        <h2 className="card-title">{value.title}</h2>
                                    </div>
                                </div>
                                <img
                                    src={value.image}
                                    className="px-3 object-fit-contain" height={300} alt="..."/>
                                <div className="card-body">
                                    <p className="card-text">{value.content}</p>
                                </div>
                            </div>
                        )
                    })) : getDetailArticleLoading ? (
                    <h4>Loading...</h4>
                ) : (
                    <h3>{getDetailArticleError ? getDetailArticleError : "Error"}</h3>
                )
            }
        </div>
    )
}

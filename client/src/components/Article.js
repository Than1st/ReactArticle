import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetArticle} from "../actions/ArticleActions";
import {create} from "axios";
import {GrArticle} from "react-icons/gr";

export const Article = () => {
    const {getArticleResult, getArticleLoading, getArticleError} = useSelector((state) => state.ArticleReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetArticle())
    }, []);
    return (
        <div className='container pt-5'>
            {
                getArticleResult.length > 0 ? (
                    getArticleResult.map((value) => {
                        const articleDate = new Date(value.createdAt)
                        return (
                            <Link to={'/article/' + value.id} style={{textDecoration: "none"}} key={value.id}>
                                <div className="card mb-4 shadow-sm">
                                    <img
                                        src={value.image}
                                        className="card-img-top object-fit-cover" height={300} alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{value.title}</h5>
                                        <p className="card-text text-truncate">{value.content}</p>
                                        <hr/>
                                        <div style={{fontSize: "13px"}}>
                                            <img className='rounded-circle me-2' style={{height: "auto", width: "35px"}}
                                                 src={value.User.image}
                                                 alt=''/>
                                            <b>{value.User.username}</b> | {`${articleDate.getDate().toString().length === 1 ? '0' + articleDate.getDate() : articleDate.getDate()}-${articleDate.getMonth().toString().length === 1 ? '0' + articleDate.getMonth() : articleDate.getMonth()}-${articleDate.getFullYear()}
                                            `} {`${articleDate.getHours().toString().length === 1 ? '0' + articleDate.getHours() : articleDate.getHours()}:${articleDate.getMinutes().toString().length === 1 ? '0' + articleDate.getMinutes() : articleDate.getMinutes()}:${articleDate.getSeconds().toString().length === 1 ? '0' + articleDate.getSeconds() : articleDate.getSeconds()}`}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) : getArticleLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div>{getArticleError ? getArticleResult :
                        <div className='d-flex justify-content-center align-content-center py-5'>
                            <div className='border p-5'>
                                <div className='d-flex justify-content-center'>
                                    <GrArticle size={80}/>
                                </div>
                                <div>
                                    <h3>Go to Posting to Post your first Article in this website</h3>
                                </div>
                            </div>
                        </div>}</div>
                )
            }
            <p className='text-center'>{getArticleResult.length === 0 ? '' : "End of post"}</p>
        </div>
    )
}

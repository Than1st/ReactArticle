import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CreateArticle, UpdateArticle} from "../actions/ArticleActions";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export const PostArticle = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const dataUser = getDataSession() ? getDataSession() : false
    const {createArticleResult} = useSelector((state) => state.ArticleReducers)
    const [data, setData] = useState({
        title: "",
        content: "",
        image: "https://via.placeholder.com/100",
        status: "",
        userid: dataUser? dataUser.data.id:'',
    })
    const [isPost, setIsPost] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const addArticle = () => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((res)=>{
            if (res.isConfirmed){
                setIsPost(true)
                dispatch(CreateArticle(data))
            }
        })
    }
    useEffect(() => {
        if (!dataUser){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Silahkan Login untuk Post Article!',
                showConfirmButton: true,
                confirmButtonText: 'Login',
                denyButtonText:'Cancel',
                showDenyButton: true,
            }).then((res)=>{
                if (res.dismiss || res.isDenied){
                    navigate('/')
                } else if (res.isConfirmed){
                    navigate('/login')
                }
            })
        }
        if (isPost){
            let timerInterval
            Swal.fire({
                title: 'Post Article Success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((res)=>{
                if (res.dismiss){
                    navigate('/')
                }
            })
        }
    }, [createArticleResult]);
    return (
        <div className='container pt-5'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Post New Article</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(addArticle)}>
                        <input type='text' onChange={(event) => setData({
                            ...data,
                            title: event.target.value
                        })} className='form-control mb-2' name='title' placeholder='Title' minLength='10' required/>
                        <textarea name='content' onChange={(event) => setData({
                            ...data,
                            content: event.target.value
                        })} className='form-control mb-2' placeholder='Content' minLength='10' required></textarea>
                        <div className='w-100'>
                            <img src={data.image} style={{width: "150px", height: "150px"}} alt=''
                                 className='mb-2 object-fit-contain'/>
                        </div>
                        <input type='text' className='form-control mb-2' onChange={(event) => setData({
                            ...data,
                            image: event.target.value
                        })} name='image' placeholder='Link Image' minLength='10' required/>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck"
                                   onChange={(event) => setData({
                                       ...data,
                                       status: event.target.checked
                                   })}/>
                            <label className="form-check-label" htmlFor="inlineFormCheck">
                                Post Now
                            </label>
                        </div>
                        <button type='submit' className='btn btn-primary w-100'>Post Article</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

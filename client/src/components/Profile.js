import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEdit} from "react-icons/ai";
import {BsFilePost, BsTrash} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DeleteArticle, GetUserArticle, UpdateArticle} from "../actions/ArticleActions";
import Swal from "sweetalert2";
import {GrArticle} from "react-icons/gr";
import {UpdateUsers} from "../actions/AuthAction";

export const Profile = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getDataSession() ? getDataSession() : false
    const [dataEdit, setDataEdit] = useState({
        title: "",
        content: "",
        image: "https://via.placeholder.com/100",
        status: "",
        userid: data ? data.data.id : 0,
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdateUsers, setIsUpdateUsers] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [biodata, setBiodata] = useState({
        username: data ? data.data.username : '',
        email: data ? data.data.email : '',
        image: data ? data.data.image : '',
        alamat: data ? data.data.alamat : '',
    })
    const dataPendidikan = data? data.data.pendidikan.split('|'):''
    const dataOrganisasi = data? data.data.organisasi.split('|'):''
    const dataKerja = data? data.data.kerja.split('|'):''
    const [pendidikan, setPendidikan] = useState({
        jenjang: dataPendidikan? dataPendidikan[0]:'def',
        instansi: dataPendidikan? dataPendidikan[1]:'',
        prodi: dataPendidikan? dataPendidikan[2]:'',
        ipk: dataPendidikan? dataPendidikan[3]:'',
    })
    const [organisasi, setOrganisasi] = useState({
        namaOrganisasi: dataOrganisasi? dataOrganisasi[0]:'',
        jabatan: dataOrganisasi? dataOrganisasi[1]:'',
        mulai: dataOrganisasi? dataOrganisasi[2]:'',
        akhir: dataOrganisasi? dataOrganisasi[3]:'',
    })
    const [kerja, setKerja] = useState({
        tempatKerja: dataKerja? dataKerja[0]:'',
        divisi: dataKerja? dataKerja[1]:'',
        jabatan: dataKerja? dataKerja[2]:'',
        deskripsi: dataKerja? dataKerja[3]:'',
        mulai: dataKerja? dataKerja[4]:'',
        akhir: dataKerja? dataKerja[5]:'',
    })
    // console.log({
    //     alamat: biodata.alamat,
    //     pendidikan: `${pendidikan.jenjang}|${pendidikan.instansi}|${pendidikan.prodi}|${pendidikan.ipk}`,
    //     organisasi: `${organisasi.namaOrganisasi}|${organisasi.jabatan}|${organisasi.mulai}|${organisasi.akhir}`,
    //     kerja: `${kerja.tempatKerja}|${kerja.divisi}|${kerja.jabatan}|${kerja.deskripsi}|${kerja.mulai}|${kerja.akhir}`,
    // })
    const {
        getUsersArticleResult,
        updateArticleResult,
        deleteArticleResult,
        getUsersArticleLoading,
        getUsersArticleError
    } = useSelector((state) => state.ArticleReducers)
    const {updateUsersResult} = useSelector((state)=> state.AuthReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function updateData(title, content, image, status) {
        return setDataEdit({
            ...dataEdit,
            title: title,
            content: content,
            image: image,
            status: status,
        })
    }

    const updateHandler = (id, event) => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsUpdate(true)
                dispatch(UpdateArticle(dataEdit, id))
            }
        })
    }

    const deleteHandler = (id, title, event) => {
        Swal.fire({
            title: `Yakin Hapus Article ${title}?`,
            showCancelButton: true,
            confirmButtonText: 'Yakin',
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelete(true)
                dispatch(DeleteArticle(id))
            }
        })
    }

    const updateUsersHandler = (id) => {
        Swal.fire({
            title: `Apakah data sudah sesuai?`,
            showCancelButton: true,
            confirmButtonText: 'Sudah',
            icon: "question"
        }).then((res) => {
            if (res.isConfirmed) {
                const dataUpdate = ({
                    username: biodata.username,
                    email: biodata.email,
                    image: biodata.image,
                    alamat: biodata.alamat,
                    pendidikan: `${pendidikan.jenjang}|${pendidikan.instansi}|${pendidikan.prodi}|${pendidikan.ipk}`,
                    organisasi: `${organisasi.namaOrganisasi}|${organisasi.jabatan}|${organisasi.mulai}|${organisasi.akhir}`,
                    kerja: `${kerja.tempatKerja}|${kerja.divisi}|${kerja.jabatan}|${kerja.deskripsi}|${kerja.mulai}|${kerja.akhir}`,
                })
                setIsUpdateUsers(true)
                dispatch(UpdateUsers(dataUpdate, id))
                // sessionStorage.setItem('tempUserData', JSON.stringify(dataUpdate))
            }
        })
    }

    useEffect(() => {
        if (!data) {
            navigate('/')
        }
        dispatch(GetUserArticle(data ? data.data.id : 0))
        if(isUpdateUsers){
            console.log(updateUsersResult)
            let timerInterval
            Swal.fire({
                title: 'Update Users success ',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        if (isUpdate) {
            let timerInterval
            Swal.fire({
                title: 'Update success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelete) {
            let timerInterval
            Swal.fire({
                title: 'Delete success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    }, [updateArticleResult, deleteArticleResult, updateUsersResult]);
    return (
        <div className='container pt-5'>
            <div className='row mb-4'>
                <div className='col-sm-3 d-flex justify-content-center'>
                    <img className='rounded-circle w-75 h-auto'
                         src={data ? data.data.image : "https://via.placeholder.com/100"} alt='...'/>
                </div>
                <div className='col-sm-9'>
                    <h3>{data ? data.data.username : "Name"}</h3>
                    <p>{data ? data.data.email : "Email"}</p>
                    <p><span className='badge bg-primary'>{data ? data.data.role : "Admin"}</span></p>
                    <div className='row'>
                        <div className='col-sm-2 p-1'>
                            <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#editCv">
                                <AiOutlineEdit className='me-2'/>Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editCv" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>Username</label>
                            <input className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                username: event.target.value
                            })} value={biodata.username} type='text'/>
                            <label>Email</label>
                            <input className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                email: event.target.value
                            })} value={biodata.email} type='email'/>
                            <img src={biodata.image} className='mb-2' style={{width: '200px', height: "auto"}}
                                 alt='...'/><br/>
                            <label>Image</label>
                            <input className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                image: event.target.value
                            })} value={biodata.image} type='email'/>
                            <label>Alamat</label>
                            <textarea className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                alamat: event.target.value
                            })} value={biodata.alamat}></textarea>
                            <h4>Pendidikan</h4>
                            <hr/>
                            <label htmlFor='pendidikan'>Pendidikan Terakhir</label>
                            <select className='form-control mb-2' defaultValue={pendidikan.jenjang} id='pendidikan'
                                    onChange={(event) => setPendidikan({...pendidikan, jenjang: event.target.value})}>
                                <option value='def' selected disabled>-Pilih Pendidikan Terakhir-</option>
                                <option value='sd'>Sekolah Dasar</option>
                                <option value='sltp'>SLTP/Sederajat</option>
                                <option value='slta'>SLTA/Sederajat</option>
                                <option value='d3'>Diploma 3</option>
                                <option value='d4'>Diploma 4</option>
                                <option value='s1'>Sarjana 1</option>
                                <option value='s2'>Sarjana 2</option>
                                <option value='s3'>Sarjana 3</option>
                            </select>
                            {
                                pendidikan.jenjang === 'sd' || pendidikan.jenjang === 'sltp' ? (
                                    <div>
                                        <label htmlFor='instansi'>Nama Sekolah</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            instansi: event.target.value
                                        })} value={pendidikan.instansi} type='text' id='instansi' name='instansi'/>
                                    </div>
                                ) : pendidikan.jenjang === 'slta' ? (
                                    <div>
                                        <label htmlFor='instansi'>Nama Sekolah</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            instansi: event.target.value
                                        })} value={pendidikan.instansi} type='text' id='instansi' name='instansi'/>
                                        <label htmlFor='jurusan'>Jurusan</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            prodi: event.target.value
                                        })} value={pendidikan.prodi} type='text' id='jurusan' name='jurusan'/>
                                    </div>
                                ) : pendidikan.jenjang === 'd3' || pendidikan.jenjang === 'd4' || pendidikan.jenjang === 's1' || pendidikan.jenjang === 's2' || pendidikan.jenjang === 's3' ? (
                                    <div>
                                        <label htmlFor='instansi'>Nama Instansi</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            instansi: event.target.value
                                        })} value={pendidikan.instansi} type='text' id='instansi' name='instansi'/>
                                        <label htmlFor='prodi'>Program Studi</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            prodi: event.target.value
                                        })} value={pendidikan.prodi} type='text' id='prodi' name='prodi'/>
                                        <label htmlFor='ipk'>IPK/GPA</label>
                                        <input className='form-control mb-2' onChange={(event) => setPendidikan({
                                            ...pendidikan,
                                            ipk: event.target.value
                                        })} value={pendidikan.ipk} type='number' id='ipk' name='ipk'/>
                                    </div>
                                ) : false
                            }
                            <h4>Organisasi</h4>
                            <hr/>
                            <label htmlFor='prodi'>Nama Organisasi</label>
                            <input className='form-control mb-2' onChange={(event) => setOrganisasi({
                                ...organisasi,
                                namaOrganisasi: event.target.value
                            })} value={organisasi.namaOrganisasi} type='text' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Jabatan</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setOrganisasi({...organisasi, jabatan: event.target.value})} value={organisasi.jabatan}
                                   type='text' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Tanggal Awal Menjabat</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setOrganisasi({...organisasi, mulai: event.target.value})} value={organisasi.mulai}
                                   type='date' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Tanggal Akhir Menjabat</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setOrganisasi({...organisasi, akhir: event.target.value})} value={organisasi.akhir}
                                   type='date' id='prodi' name='prodi'/>
                            <h4>Pengalaman Kerja</h4>
                            <hr/>
                            <label htmlFor='prodi'>Nama Instansi</label>
                            <input className='form-control mb-2' onChange={(event) => setKerja({
                                ...kerja,
                                tempatKerja: event.target.value
                            })} value={kerja.tempatKerja} type='text' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Divisi</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setKerja({...kerja, divisi: event.target.value})} value={kerja.divisi}
                                   type='text' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Jabatan</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setKerja({...kerja, jabatan: event.target.value})} value={kerja.jabatan}
                                   type='text' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Deskripsi</label>
                            <textarea className='form-control mb-2'
                                   onChange={(event) => setKerja({...kerja, deskripsi: event.target.value})} value={kerja.deskripsi} id='prodi' name='prodi'></textarea>
                            <label htmlFor='prodi'>Tanggal Awal Menjabat</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setKerja({...kerja, mulai: event.target.value})} value={kerja.mulai}
                                   type='date' id='prodi' name='prodi'/>
                            <label htmlFor='prodi'>Tanggal Akhir Menjabat</label>
                            <input className='form-control mb-2'
                                   onChange={(event) => setKerja({...kerja, akhir: event.target.value})} value={kerja.akhir}
                                   type='date' id='prodi' name='prodi'/>
                            <p>note : data ini akan digunakan dihalaman about</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={()=>updateUsersHandler(data ? data.data.id:0)} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>My Post</h2>
            <hr/>
            {
                getUsersArticleResult.length > 0 ? (
                    getUsersArticleResult.map((value) => {
                        const articleDate = new Date(value.createdAt)
                        return (
                            <div className="card mb-4 shadow-sm" key={value.id}>
                                <img
                                    src={value.image}
                                    className="card-img-top object-fit-cover" height={300} alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                    <p className="card-text text-truncate">{value.content}</p>
                                    <hr/>
                                    <div style={{fontSize: "13px"}}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <img className='rounded-circle me-2'
                                                     style={{height: "auto", width: "35px"}}
                                                     src={value.User.image}
                                                     alt=''/>
                                                <b>{value.User.username}</b> | {`${articleDate.getDate().toString().length === 1 ? '0' + articleDate.getDate() : articleDate.getDate()}-${articleDate.getMonth().toString().length === 1 ? '0' + articleDate.getMonth() : articleDate.getMonth()}-${articleDate.getFullYear()}
                                            `} {`${articleDate.getHours().toString().length === 1 ? '0' + articleDate.getHours() : articleDate.getHours()}:${articleDate.getMinutes().toString().length === 1 ? '0' + articleDate.getMinutes() : articleDate.getMinutes()}:${articleDate.getSeconds().toString().length === 1 ? '0' + articleDate.getSeconds() : articleDate.getSeconds()}`} {value.status ?
                                                <span className='badge bg-success'>Posted</span> :
                                                <span className='badge bg-warning'>Draft</span>}
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='row d-flex justify-content-end'>
                                                    <div className='col-sm-3'>
                                                        <Link to={'/article/' + value.id}>
                                                            <button className='btn btn-success w-100'>
                                                                <BsFilePost/> View Post
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <button data-bs-toggle="modal"
                                                                data-bs-target={'#modalEdit' + value.id}
                                                                className='btn btn-primary w-100'
                                                                onClick={() => updateData(value.title, value.content, value.image, value.status)}>
                                                            <AiOutlineEdit/> Edit Post
                                                        </button>
                                                    </div>
                                                    <div className="modal" id={'modalEdit' + value.id} tabIndex="-1">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">Edit Article</h5>
                                                                    <button type="button" className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <input type='text'
                                                                           onChange={(event) => setDataEdit({
                                                                               ...dataEdit,
                                                                               title: event.target.value
                                                                           })} value={dataEdit.title}
                                                                           className='form-control mb-2' name='title'
                                                                           placeholder='Title' minLength='10' required/>
                                                                    <textarea name='content'
                                                                              onChange={(event) => setDataEdit({
                                                                                  ...dataEdit,
                                                                                  content: event.target.value
                                                                              })} value={dataEdit.content}
                                                                              className='form-control mb-2'
                                                                              placeholder='Content' minLength='10'
                                                                              required></textarea>
                                                                    <div
                                                                        className='w-100 p-1 d-flex justify-content-center'>
                                                                        <img src={dataEdit.image}
                                                                             style={{width: "150px", height: "150px"}}
                                                                             alt=''
                                                                             className='mb-2 object-fit-contain'/>
                                                                    </div>
                                                                    <input type='text' className='form-control mb-2'
                                                                           onChange={(event) => setDataEdit({
                                                                               ...dataEdit,
                                                                               image: event.target.value
                                                                           })} value={dataEdit.image} name='image'
                                                                           placeholder='Link Image'
                                                                           minLength='10' required/>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input"
                                                                               type="checkbox"
                                                                               id={"inlineFormCheck" + value.id}
                                                                               checked={dataEdit.status}
                                                                               onChange={(event) => setDataEdit({
                                                                                   ...dataEdit,
                                                                                   status: event.target.checked
                                                                               })}/>
                                                                        <label className="form-check-label"
                                                                               htmlFor={"inlineFormCheck" + value.id}>
                                                                            Post?
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary"
                                                                            data-bs-dismiss="modal">Close
                                                                    </button>
                                                                    <button
                                                                        onClick={(event) => updateHandler(value.id, event)}
                                                                        type="submit"
                                                                        className="btn btn-primary"
                                                                        data-bs-dismiss="modal">Save
                                                                        Changes
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <button
                                                            onClick={(event) => deleteHandler(value.id, value.title, event)}
                                                            className='btn btn-danger w-100'><BsTrash/> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : getUsersArticleLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div>
                        {getUsersArticleError ?
                            getUsersArticleError :
                            <div className='d-flex justify-content-center align-content-center py-5'>
                                <div className='border p-5'>
                                    <div className='d-flex justify-content-center'>
                                        <GrArticle size={80}/>
                                    </div>
                                    <div>
                                        <h3>Go to Posting to Post your first Article</h3>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
            <p className='text-center'>{getUsersArticleResult.length === 0 ? '' : "End of post"}</p>
        </div>
    )
}

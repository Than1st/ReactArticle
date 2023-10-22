import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {DetailsUsers} from "../actions/AuthAction";
import {AiOutlineEdit} from "react-icons/ai";

export const About = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getDataSession() ? getDataSession() : false
    const {detailsUsersResult, detailsUsersLoading, detailsUsersError} = useSelector((state) => state.AuthReducers)
    // const [biodata, setBiodata] = useState({
    //     username: data ? data.data.username : '',
    //     email: data ? data.data.email : '',
    //     image: data ? data.data.image : '',
    //     alamat: data ? data.data.alamat : '',
    // })
    const params = useParams()
    const dispatch = useDispatch()
    // const dataPendidikan = detailsUsersResult ? detailsUsersResult[0].pendidikan.split('|') : ''
    // const dataOrganisasi = detailsUsersResult ? detailsUsersResult[0].organisasi.split('|') : ''
    // const dataKerja = detailsUsersResult ? detailsUsersResult[0].kerja.split('|') : ''
    // const [pendidikan, setPendidikan] = useState({
    //     jenjang: dataPendidikan ? dataPendidikan[0] : 'def',
    //     instansi: dataPendidikan ? dataPendidikan[1] : '',
    //     prodi: dataPendidikan ? dataPendidikan[2] : '',
    //     ipk: dataPendidikan ? dataPendidikan[3] : '',
    // })
    // const [organisasi, setOrganisasi] = useState({
    //     namaOrganisasi: dataOrganisasi ? dataOrganisasi[0] : '',
    //     jabatan: dataOrganisasi ? dataOrganisasi[1] : '',
    //     mulai: dataOrganisasi ? dataOrganisasi[2] : '',
    //     akhir: dataOrganisasi ? dataOrganisasi[3] : '',
    // })
    // const [kerja, setKerja] = useState({
    //     tempatKerja: dataKerja ? dataKerja[0] : '',
    //     divisi: dataKerja ? dataKerja[1] : '',
    //     jabatan: dataKerja ? dataKerja[2] : '',
    //     deskripsi: dataKerja ? dataKerja[3] : '',
    //     mulai: dataKerja ? dataKerja[4] : '',
    //     akhir: dataKerja ? dataKerja[5] : '',
    // })
    useEffect(() => {
        dispatch(DetailsUsers(params.id))
        console.log(detailsUsersResult)
    }, []);
    return (
        <div className='container pt-5'>
            {
                detailsUsersResult ? (
                    detailsUsersResult.map((value) =>
                        <div key={value.id}>
                            <div className='mb-4'>
                                <h3>About Creator</h3>
                            </div>
                            <div className='row mb-4'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <img className='rounded-circle object-fit-cover' style={{height: "200px", width: "200px"}}
                                         src={value.image} alt='...'/>
                                </div>
                                <div className='col-sm-9'>
                                    <h3>{value.username}</h3>
                                    <p>{value.email}</p>
                                    <p><span className='badge bg-primary'>{value.role}</span></p>
                                </div>
                            </div>
                            <div className='mb-4'>
                                <h3>Pendidikan</h3>
                                <hr/>
                                <div>{value.pendidikan.split('|')[0] !== 'def' ?value.pendidikan.split('|')[0]:'-'}</div>
                                <div>{value.pendidikan?value.pendidikan.split('|')[1]:'-'}</div>
                                <div>{value.pendidikan?value.pendidikan.split('|')[2]:'-'}</div>
                                <div>{value.pendidikan?value.pendidikan.split('|')[3]:'-'}</div>
                            </div>
                            <div className='mb-4'>
                                <h3>Organisasi</h3>
                                <hr/>
                                <div>{value.organisasi?value.organisasi.split('|')[0]:'-'}</div>
                                <div>{value.organisasi?value.organisasi.split('|')[1]:'-'}</div>
                                <div>{value.organisasi?value.organisasi.split('|')[2]:'-'} - {value.organisasi?value.organisasi.split('|')[3]:'-'}</div>
                            </div>
                            <div className='mb-4'>
                                <h3>Pengalaman Kerja</h3>
                                <hr/>
                                <div>{value.kerja.split('|')[0]}</div>
                                <div>{value.kerja.split('|')[1]}</div>
                                <div>{value.kerja.split('|')[2]}</div>
                                <div>{value.kerja.split('|')[3]}</div>
                                <div>{value.kerja.split('|')[4]} - {value.kerja.split('|')[5]}</div>
                            </div>
                        </div>
                    )
                ) : detailsUsersLoading? (
                    <p>loading...</p>
                ) : (
                    <p>loading...</p>
                )
            }
        </div>
    )
}

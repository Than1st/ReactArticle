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
    const {detailsUsersResult} = useSelector((state) => state.AuthReducers)
    const [biodata, setBiodata] = useState({
        username: data ? data.data.username : '',
        email: data ? data.data.email : '',
        image: data ? data.data.image : '',
        alamat: data ? data.data.alamat : '',
    })
    const params = useParams()
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(DetailsUsers(params.id))
    }
    const dataPendidikan = detailsUsersResult ? detailsUsersResult[0].pendidikan.split('|') : ''
    const dataOrganisasi = detailsUsersResult ? detailsUsersResult[0].organisasi.split('|') : ''
    const dataKerja = detailsUsersResult ? detailsUsersResult[0].kerja.split('|') : ''
    const [pendidikan, setPendidikan] = useState({
        jenjang: dataPendidikan ? dataPendidikan[0] : 'def',
        instansi: dataPendidikan ? dataPendidikan[1] : '',
        prodi: dataPendidikan ? dataPendidikan[2] : '',
        ipk: dataPendidikan ? dataPendidikan[3] : '',
    })
    const [organisasi, setOrganisasi] = useState({
        namaOrganisasi: dataOrganisasi ? dataOrganisasi[0] : '',
        jabatan: dataOrganisasi ? dataOrganisasi[1] : '',
        mulai: dataOrganisasi ? dataOrganisasi[2] : '',
        akhir: dataOrganisasi ? dataOrganisasi[3] : '',
    })
    const [kerja, setKerja] = useState({
        tempatKerja: dataKerja ? dataKerja[0] : '',
        divisi: dataKerja ? dataKerja[1] : '',
        jabatan: dataKerja ? dataKerja[2] : '',
        deskripsi: dataKerja ? dataKerja[3] : '',
        mulai: dataKerja ? dataKerja[4] : '',
        akhir: dataKerja ? dataKerja[5] : '',
    })
    useEffect(() => {
        getData()
        console.log(detailsUsersResult)
    }, []);
    return (
        <div className='container pt-5'>
            <div className='mb-4'>
                <h3>About Creator</h3>
            </div>
            <div className='row mb-4'>
                <div className='col-sm-3 d-flex justify-content-center'>
                    <img className='rounded-circle w-75 h-auto'
                         src={detailsUsersResult? detailsUsersResult[0].image : "https://via.placeholder.com/100"} alt='...'/>
                </div>
                <div className='col-sm-9'>
                    <h3>{detailsUsersResult? detailsUsersResult[0].username : "Name"}</h3>
                    <p>{detailsUsersResult? detailsUsersResult[0].email : "Email"}</p>
                    <p><span className='badge bg-primary'>{detailsUsersResult? detailsUsersResult[0].role : "Admin"}</span></p>
                </div>
            </div>
            <div className='mb-4'>
                <h3>Pendidikan</h3>
                <hr/>
                <div>{pendidikan.instansi}</div>
                <div>{pendidikan.jenjang}</div>
                <div>{pendidikan.prodi}</div>
                <div>{pendidikan.ipk}</div>
            </div>
            <div className='mb-4'>
                <h3>Organisasi</h3>
                <hr/>
                <div>{organisasi.namaOrganisasi}</div>
                <div>{organisasi.jabatan}</div>
                <div>{organisasi.mulai} - {organisasi.akhir}</div>
            </div>
            <div className='mb-4'>
                <h3>Pengalaman Kerja</h3>
                <hr/>
                <div>{kerja.tempatKerja}</div>
                <div>{kerja.divisi}</div>
                <div>{kerja.jabatan}</div>
                <div>{kerja.deskripsi}</div>
                <div>{kerja.mulai} - {kerja.akhir}</div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { config, getStorage } from '../lib'
import { useNavigate } from 'react-router-dom'
import {setUser} from '../store'
import { Loading } from '../components/Loading'
import http from '../http'

export const PrivateRoutes = ({element}) => {

    const user = useSelector(state => state.user.value)
    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() =>{
        
if(Object.keys(user).length == 0){
    const token = getStorage(config('token_name'))

    if(token){
        setLoading(true)
        http.get('profile/details')
        .then(({data})=> dispatch(setUser(data)))
        .catch(err => navigate('/cms/login'))
        .finally(() =>setLoading(false))

    }else{
        navigate('/cms/login')
    }



}
    }, [user])
    

  return loading ? <Loading/> : element
}

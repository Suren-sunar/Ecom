import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AdminRoutes = ({element}) => {
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()
    useEffect(()=>{
        if(user.type == 'staff') {
        toast.error('Access Denied')
        navigate('/cms/dashboard')
        }

    },[])
  return element
}

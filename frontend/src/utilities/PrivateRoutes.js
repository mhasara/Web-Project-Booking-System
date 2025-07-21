import React,{ useEffect } from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const PrivateRoutes = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        
    },[dispatch])
  return (
    userInfo ? <Outlet/>: <Navigate to='/login'/>
  )
}

export default PrivateRoutes
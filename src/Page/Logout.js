import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import userSlice from '../store/user'


const Logout = () => {

    const dispatch = useDispatch()

    // menghapus token dari localStorage
    localStorage.removeItem('minishopAccessToken')
    // mengupdate user store menjadi null
    dispatch( userSlice.actions.removeUser() )

    return(
        <Navigate to='/login'/>
    )
}

export default Logout
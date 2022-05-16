import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import userSlice from '../store/user'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login'


const Login = () => {

    const { register, handleSubmit, formState } = useForm()
    const [loginStatus, setloginStatus] = useState({
        success: false,
        message: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password
        }
        axios.post('http://localhost:4000/login', postData)
        .then( res=> {
            if (typeof res.data.accessToken !== 'undefined'){
                // menyimpan token di localstorage
                localStorage.setItem('minishopAccessToken', res.data.accessToken)
                // menyimpan user di redux store
                const user = jwtDecode(res.data.accessToken)
                axios.get(`http://localhost:4000/users/${user.sub}`)
                .then( res => {
                    dispatch( userSlice.actions.addUser({userData: res.data}) )
                    navigate('/')
                })
            }
            
        })
        .catch( err => {
            setloginStatus({
                success: false,
                message: 'sorry, something is wrong, Try again later'
            })
        })
    }

    const googleSuccessLogin = (res) => {
        console.log(res)
    }
    const googleFailedLogin = (err) => {
        console.log(err)
    }

    return (
        <section>
                <div className="container py-8">
                    <div className="max-w-[500px] mx-auto">
                    { (!loginStatus.success && loginStatus.message) && <p className='text-sm text-red-500 italic'>{loginStatus.message}</p>} 
                        <form onSubmit={ handleSubmit(formSubmitHandler) }>
                            <div className="mb-4">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_email', {required: true})} autoComplete="true" />
                                <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user_password">Password</label>
                                <input type="password" name="user_password" id="user_password" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_password',  {required: true})} autoComplete="true" />
                                <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                            </div>
                            <div className="mb-8">
                                <button type="submit" className="bg-green-700 px-6 py-2 text-white">Login</button>
                            </div>
                            <p>Don't have an accout? <Link to="/register" className="text-blue-600">Register Now</Link></p>
                        </form>
                        <GoogleLogin
                                clientId="547625838498-ipttddpf985fa7gksm8qsiie11295r48.apps.googleusercontent.com"
                                render={Props => (
                                    <button onClick={Props.onClick} disabled={Props.disabled} className='bg-red-500 text-white px-8 py-3'>Login With Google</button>
                                  )}
                                onSuccess={googleSuccessLogin}
                                onFailure={googleFailedLogin}
                                cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </section>
    )
}

export default Login
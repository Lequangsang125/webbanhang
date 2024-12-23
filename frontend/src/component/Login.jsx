import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispath = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation('')
    const navigate = useNavigate()


    //handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        try {
            const res = await loginUser(data).unwrap();
            console.log(res);
            const {token,user} = res
            dispath(setUser({user}))
            alert('login thanh cong')
            navigate("/")
        } catch (error) {
            setMessage('Tài khoản không tồn tại hoặc mật khẩu sai ')
        }



    }
    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-2xl font-semibold pt-5'>ĐĂNG NHẬP </h2>
                <form
                    onSubmit={handleLogin}
                    className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input
                        type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='nhập email của bạn '
                        required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />

                    <input
                        type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='mật khẩu '
                        required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {
                        message && <p className='text-red-500'>{message}</p>
                    }
                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                    >ĐĂNG NHẬP</button>
                </form>
                <p className='my-5 italic text-sm text=center '>Bạn chưa có tài khoản ?
                    <Link to="/register" className='text-red-700 px-1 underline font-semibold'> Đăng ký
                    </Link> tại đây. </p>
            </div>
        </section>
    )
}

export default Login

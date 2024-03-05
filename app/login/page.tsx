import React from 'react'

const LoginPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='bg-slate-500 flex flex-col justify-center p-8 rounded-xl'>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='username'/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='password' />
        </div>
    </div>
  )
}

export default LoginPage
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(e.target);
        const form = e.target;
        const email = form[0].value;
        const password = form[1].value;
        // console.log(email,password);
        signIn()
        .then(result=>{
            const user = result.user;
            // console.log(user);
            navigate(`${location.state? location.state : '/'}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            // alert(errorMessage,errorCode);
            setError(errorCode);
        });
    };
    return (
     <form onSubmit={handleLogin} className='flex justify-center min-h-screen items-center'>
       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Login Your Account</h2>
       <div className="card-body">
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
           name='email'
            type="email" 
            className="input"
             placeholder="Email"
             required />
          {/* Password */}
          <label className="label">Password</label>
          <input
           name='password'
            type="password"
             className="input"
              placeholder="Password"
              required />
          <div><a className="link link-hover">Forgot password?</a></div>
          {error && <p className='text-red-400 text-xs'>{error}</p>}


          <button type='submit' className="btn btn-neutral mt-4">Login</button>
           <p className='font-semibold text-center pt-5'>Don,t Have An Account ? <Link className='text-secondary' to="/auth/register"> Register</Link></p>

        </fieldset>
      </div>
    </div>
        </form>
    );
};

export default Login;
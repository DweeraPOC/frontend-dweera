import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Middlewares/AuthContext';

export default function AdminLogin() {
    const [info,setInfo] = useState({
        email : "",
        password : ""
    });

    const auth = useAuth();
    const navigate = useNavigate();
    const Handlelogin = async () => {
      await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/admin/login`,
        {
          'Email' : info.email,
          'Password' : info.password
        }
      )
      .then((response) => {
        auth.Login({
          token : response.data.token,
          role : response.data.role,
        });
        localStorage.setItem("role",response.data.role);
        navigate('/admin/');
      ;
      })
      .catch((err) => {
        //console.log("error  ",err);
      })
    }
  return (
    <>
    <div className="w-full flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Admin login
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#65D01E] focus:outline-none focus:ring-[#65D01E] sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      email : e.currentTarget.value
                    })
                  }}
                  value={info.email}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#65D01E] focus:outline-none focus:ring-[#65D01E] sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      password : e.currentTarget.value
                    })
                  }}
                  value={info.password}
                />
              </div>
            </div>

            <div>
              <button
                onClick={Handlelogin}
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#65D01E] py-2 px-4 text-sm font-medium text-white hover:bg-[#65D01E] focus:outline-none focus:ring-2 focus:ring-[#65D01E] focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

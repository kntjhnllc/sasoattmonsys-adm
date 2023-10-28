import React from 'react';
import { useState } from "react";
import { FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import {MdLockOutline} from 'react-icons/md';
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"></link>


const HomePage = () => {

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpVisible(!isSignUpVisible);
  };


  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
      <main className='flex flex-col flex-1 text-center px-20 items-center justify-center w-full h-screen'>
        <div className='bg-white flex rounded-2xl shadow-2xl w-2/3 max-w-4xl'>
          <div className={`w-3/5 p-5 ${isSignUpVisible ? 'signIn-slide-in' : 'signIn-slide-out'}`}>
            <div className={`${isSignUpVisible ? 'text-container-invi' : 'text-container-full'}`}>
              <div className='text-left font-bold font-montserrat'>
                <span className='text-blue-900'>HCDC -</span> SASO
              </div>
              <div className='py-10'>
                <h2 className='text-3xl font-bold text-blue-900 mb-2'>
                  Sign in to Account
                </h2>
                <div className='border-2 w-10 border-blue-900 inline-block mb-2'></div>
                <div className='flex justify-center my-2 '>
                  <a href='#' className='border-blue-900 text-blue-900 justify-center items-center flex border-2 rounded-full py-2 px-5 hover:bg-blue-950 hover:text-white'>
                    <p className='mr-1 '>Sign in using</p> 
                    <FaGoogle/>
                    <p className=''>oogle</p> 
                  </a>
                </div>
                <p className='text-gray-400 my-3'>or use your HCDC premium email</p>
                <div className='flex flex-col items-center'>
                  <div className='bg-gray-100 w-64 p-2 mb-3 text-blue-900 flex items-center'>
                    <FaRegEnvelope className='m-2'/>
                    <input type='email' name='signin.email' required placeholder='HCDC Email' className='bg-gray-100 outline-none text-sm flex-1'/>
                  </div>
                  <div className='bg-gray-100 w-64 mb-3 p-2 text-blue-900 flex items-center'>
                    <MdLockOutline className='m-2'/>
                    <input type='password' name='signin.password' required placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1'/>
                  </div>
                  <a href='#signIn' className='border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-950 hover:text-white'>
                    Sign In
                  </a>
                </div>
              </div>
            </div>
            <div className={`-mt-[435px]  ${isSignUpVisible ? 'text-container-sign-up' : 'text-container-sign-up-invi'}`} style={{ opacity: isSignUpVisible ? 1 : 0 }}>
                <div className='text-left font-bold font-montserrat '>
                  HCDC - <span className='text-blue-900'>SASO</span>
                </div>
                <div className='py-16'>
                  <h2 className='text-3xl font-bold text-blue-900 mb-2'>
                    Sign up your Account
                  </h2>
                  <div className='border-2 w-10 border-blue-900 inline-block mb-2'></div>
                  <p className='text-gray-400 my-3'>Using your HCDC premium email</p>
                  <div className='flex flex-col items-center'>
                    <div className='bg-gray-100 w-64 p-2 mb-3 text-blue-900 flex items-center'>
                      <FaRegEnvelope className='m-2'/>
                      <input type='email' name='signup.email' required placeholder='HCDC Email' className='bg-gray-100 outline-none text-sm flex-1'/>
                    </div>
                    <div className='bg-gray-100 w-64 mb-3 p-2 text-blue-900 flex items-center'>
                      <MdLockOutline className='m-2'/>
                      <input type='password' name='signup.password' required placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1'/>
                    </div>
                    <a href='#signup' className='border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-950 hover:text-white'>
                      Sign Up
                    </a>
                  </div>
                </div>
            </div>
          </div>
          <div className={`w-2/5 bg-blue-950 text-gray-100 rounded-tr-2xl rounded-br-2xl py-36 px-12 ${isSignUpVisible ? 'signUp-slide-in' : 'signUp-slide-out'}`}>
            <div className={`${isSignUpVisible ? 'text-container-invi' : 'text-container-full'}`}>
              <h2 className='text-3xl font-bold mb-2 font-montserrat'>Hello, Scholar!</h2>
              <div className='border-2 w-10 border-white inline-block mb-2'></div>
              <p className='mb-10'>
                Fill up personal information and start journey with us.
              </p>
              <a href='#' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-950'
              onClick={handleSignUpClick}>
                Sign Up
              </a>
            </div>
            <div className="text-container-sign-in -mt-48 " style={{ opacity: isSignUpVisible ? 1 : 0 }}>
              <h2 className='text-3xl font-bold mb-2 font-montserrat'>Hello, Scholar!</h2>
              <div className='border-2 w-10 border-white inline-block mb-2'></div>
              <p className='mb-10'>
                Already have your account?
              </p>
              <a href='#' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-950'
              onClick={handleSignUpClick}>
                Sign In
              </a>
            </div>
          </div>
        </div>      
      </main>
    </div>
  );
};

export default HomePage;
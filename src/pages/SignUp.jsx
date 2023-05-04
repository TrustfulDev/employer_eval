import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUser } from '../firebase';
import {bench, tulip } from "../assets";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    // User Information
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bookmark: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    // Handles input changes
    const inputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    // Form submission for Sign Up
    const signUp = (e) => {
        e.preventDefault();

        if(userInfo.password.length < 6){
            setErrorMessage('Password should be at least 6 characters');
            return;
        }

        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) => {
                createUser(userCredential.user.uid, userInfo);
                navigate('/');
        })
        .catch((err) => {
            const error = err.message;
            setErrorMessage(error);
        });
    };

    return (
        <div className ="min-h-screen flex flex-col">
            <Link to='/'><h1 className="block text-white text-2xl font-bold px-8 py-4">Employer<span className="text-purple-500">Eval</span> <span className="text-base ml-3">Home</span> </h1></Link>
            <div className ="flex flex-1 items-center px-36 gap-8 lg:px-8">
                <div class="w-full max-w-md">
                    <form className="black-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4" id='sign-up-form' onSubmit={signUp}>
                        <h1 className="block text-white-800 text-2xl font-bold mb-6">Create Your Account</h1> 

                        {errorMessage && (
                                    <div className="block text-red-600 text-sm font-bold mb-5">
                                        {errorMessage}
                                    </div>
                                )
                         }
                         
                        <div className="mb-2">
                            <label className="block white text-md font-bold" htmlFor='firstName'>First Name</label>
                            <input className="shadow appearance-none bg-white border-2 border-purple-500 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none"
                                name='firstName' 
                                id='firstName'
                                type='text'
                                value={userInfo.firstName}
                                required
                                onChange={(e) => inputChange(e)} 
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block white text-md font-bold" htmlFor='lastName'>Last Name</label>
                            <input className="shadow appearance-none bg-white border-2 border-purple-500 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none"
                                name='lastName' 
                                id='lastName'
                                type='text' 
                                value={userInfo.lastName}
                                required
                                onChange={(e) => inputChange(e)} 
                            />
                        </div>
                    
                        <div className="mb-2">
                            <label className="block white text-md font-bold" htmlFor='email'>Email</label>
                            <input className="shadow appearance-none bg-white border-2 border-purple-500 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none"
                                name='email' 
                                id='email'
                                type='email' 
                                value={userInfo.email} 
                                required
                                onChange={(e) => inputChange(e)} 
                            />
                        </div>

                        <div className="mb-10 sm:mb-8">
                            <label className="block white text-md font-bold" htmlFor='password'>Password</label>
                            <input className="shadow appearance-none bg-white border-2 border-purple-500 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none"
                                name='password' 
                                id='password'
                                type='password' 
                                value={userInfo.password} 
                                required
                                onChange={(e) => inputChange(e)} 
                            />
                        </div>

                        <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 rounded mb-4 w-full sm:mb-1">Sign Up</button>

                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <h3 className="mx-4 text-center font-semibold dark:text-white text-xl">or</h3>
                        </div>

                        <div className="flex justify-center">
                            <h4 className="text-white text-lg sm:text-base xsm:text-sm">Already have an account? 
                                <Link className="text-purple-500 text-lg font-bold sm:text-base xsm:text-sm" to='/login'> Sign In</Link>
                            </h4>
                        </div> 
                    </form>
                </div>
                <h1 className="text-white text-6xl font-bold mb-auto w-[5%] mt-28 md:hidden">JOIN THE FAMILY!</h1>
                <img src={bench} alt='A bench' className="absolute bottom-0 right-[354px] w-[236px] h-auto xl:right-[184px] xl:w-[136px]" />
                <img src={tulip} alt='A tulip plant' className="absolute bottom-0 right-[130px] w-[183px] h-auto xl:right-[20px] xl:w-[200px] sm:w-[100px]" />
            </div>
        </div>
    ) 
}

export default SignUp;
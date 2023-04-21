import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUser } from '../firebase';
import {bench, tulip } from "../assets";
import { Link } from "react-router-dom";

const SignUp = () => {
    // User Information
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bookmark: ''
    });

    // Handles input changes
    const inputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    // Form submission for Sign Up
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) => {
                createUser(userCredential.user.uid, userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className ="pt-20 px-56">
            <div class="w-full max-w-md">
                <form className="black-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4" id='sign-up-form' onSubmit={signUp}>
                    <h1 className="flex justify-center block text-white-800 text-lg font-bold mb-6">Create Your Account</h1> 
                    <div className="mb-2">
                        <label className="block white text-md font-bold" htmlFor='firstName'>First Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            name='firstName' 
                            type='text'
                            value={userInfo.firstName}
                            onChange={(e) => inputChange(e)} 
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block white text-md font-bold" htmlFor='lastName'>Last Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            name='lastName' 
                            type='text' 
                            value={userInfo.lastName}
                            onChange={(e) => inputChange(e)} 
                        />
                    </div>
                
                    <div className="mb-2">
                        <label className="block white text-md font-bold" htmlFor='email'>Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            name='email' 
                            type='email' 
                            value={userInfo.email} 
                            onChange={(e) => inputChange(e)} 
                        />
                    </div>

                    <div className="mb-10">
                        <label className="block white text-md font-bold" htmlFor='password'>Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            name='password' 
                            type='password' 
                            value={userInfo.password} 
                            onChange={(e) => inputChange(e)} 
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-40 rounded mb-4">Sign Up</button>
                    </div>

                    <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <h3 class="mx-4 text-center font-semibold dark:text-white text-xl">or</h3>
                    </div>

                    <div className="flex justify-center">
                        <h4 className="text-white text-lg">Already have an account? 
                            <Link className="text-purple-500 text-lg font-bold" to='/login'> LOGIN</Link>
                        </h4>
                    </div> 
                </form>
            </div>
            <h1 className="absolute top-56 right-44 block text-white text-5xl font-bold">JOIN THE FAMILY!</h1>
            <img src={bench} alt='A bench' className="absolute bottom-0 right-[354px] w-[236px] h-auto md:right-[184px] md:w-[136px]" />
            <img src={tulip} alt='A tulip plant' className="absolute bottom-0 right-[130px] w-[183px] h-auto md:right-[20px] md:w-[200px]" />
        </div>
    ) 
}

export default SignUp;
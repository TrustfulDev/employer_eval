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
        <div class="w-full max-w-md">
            <form className="sign-up-form black-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={signUp}>
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
                    <label className="block white " htmlFor='password'>Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        name='password' 
                        type='password' 
                        value={userInfo.password} 
                        onChange={(e) => inputChange(e)} 
                    />
                </div>

                <div className="flex justify-center">
                    <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-20 rounded mb-6">Sign Up</button>
                </div>

                <div className="flex justify-center">
                    <h3 className="block text-white-800 text-lg font-bold">----------or----------</h3>
                </div>
                <div className="flex justify-center">
                    <h4 className="text-white text-md">Alreay have an account? 
                        <Link className="text-purple-500 text-md font-bold" to='/login'> LOGIN</Link>
                    </h4>
                </div>
                
            </form>
        </div>
    ) 
}

export default SignUp;
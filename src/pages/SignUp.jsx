import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUser } from '../firebase';

const SignUp = () => {
    // User Information
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
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
        <div>
            <form onSubmit={signUp}>
                <h1>Create Your Account</h1>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    name='firstName' 
                    type='text'
                    value={userInfo.firstName}
                    onChange={(e) => inputChange(e)} 
                />

                <label htmlFor='lastName'>Last Name</label>
                <input 
                    name='lastName' 
                    type='text' 
                    value={userInfo.lastName}
                    onChange={(e) => inputChange(e)} 
                />

                <label htmlFor='email'>Email</label>
                <input 
                    name='email' 
                    type='email' 
                    value={userInfo.email} 
                    onChange={(e) => inputChange(e)} 
                />

                <label htmlFor='password'>Password</label>
                <input 
                    name='password' 
                    type='password' 
                    value={userInfo.password} 
                    onChange={(e) => inputChange(e)} 
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
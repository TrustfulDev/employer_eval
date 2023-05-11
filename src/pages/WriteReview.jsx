import { getFirestore, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { StarRating } from "../components";
import { createBg } from '../assets';
import { useNavigate } from 'react-router';

const WriteReview = () => {
    const navigate = useNavigate();
    const [employerInfo, setEmployerInfo] = useState({
        employerName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        rating: 0
    });

    // Handles input changes
    const inputChange = (e) => {
        const { name, value } = e.target;
        setEmployerInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleCreate = (e) => {
        e.preventDefault();
        navigate('/search');
    }

    return (
        <div className='min-h-screen relative'>
            <form onSubmit={handleCreate} className='absolute w-3/6 h-full pt-20 px-8 md:w-full'>
                <h1 className='text-6xl lg:text-3xl'>Your review</h1>
                <hr className='mb-8'/>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='employerName'>Difficulty</label>
                    <div className="mt-2">
                        <StarRating/>
                    </div>
                </div>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='streetAddress'>Enjoyment</label>
                    <div className="mt-2">
                        <StarRating/>
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='city'>Flexibility</label>
                    <div className="mt-2">
                        <StarRating/>
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='state'>Diversity</label>
                    <div className="mt-2">
                        <StarRating/>
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='zipCode'>Pay</label>
                    <div className="mt-2">
                        <StarRating/>
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='rating'>Additional comments</label>
                    <div className="mt-2">
                        <textarea
                            id='rating'
                            name='rating'
                            className='bg-white rounded w-full py-10 px-3 text-black leading-tight'
                            style={{ paddingTop: '10px', marginTop: '-1px' }}
                            onChange={(e) => inputChange(e)}
                        ></textarea>
                    </div>
                </div>

                <button type='submit' className='bg-purple-700 w-full rounded px-4 py-2.5 transition-all hover:bg-purple-600 mt-2'>Submit Review</button>
            </form>

            <img src={createBg} alt='Workplace' className='absolute w-3/6 h-screen object-cover right-0 md:hidden' />

        </div>
    )
}

export default WriteReview;
import { createEmployer} from '../firebase';
import { useState } from 'react';
import { createBg } from '../assets';
import { useNavigate } from 'react-router';

const CreateEmployer = () => {
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
        createEmployer(employerInfo);
        navigate('/search');
    }

    return (
        <div className='min-h-screen overflow-hidden relative'>
            <form onSubmit={handleCreate} className='absolute w-3/6 h-full pt-20 px-8 md:w-full'>
                <h1 className='text-6xl lg:text-3xl'>CREATE AN EMPLOYER</h1>
                <hr className='mb-8'/>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='employerName'>Employer Name</label>
                    <input type='text' id='employerName' name='employerName' 
                        className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                        onChange={(e) => inputChange(e)}
                    />
                </div>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='streetAddress'>Street Address</label>
                    <input type='text' id='streetAddress' name='streetAddress' 
                        className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                        onChange={(e) => inputChange(e)}
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' name='city' 
                        className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                        onChange={(e) => inputChange(e)}
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='state'>State</label>
                    <input type='text' id='state' name='state' 
                        className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                        onChange={(e) => inputChange(e)}
                    />
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='zipCode'>Zipcode</label>
                        <input type='number' id='zipCode' name='zipCode' 
                            className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                            onChange={(e) => inputChange(e)}
                        />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label htmlFor='rating'>Rating (0-5)</label>
                        <input type='number' min="0" max="5" id='rating' name='rating' 
                            className='bg-white rounded w-full py-2 px-3 text-black leading-tight'
                            onChange={(e) => inputChange(e)}
                        />
                    </div>
                </div>

                <button type='submit' className='bg-purple-700 w-full rounded px-4 py-2.5 transition-all hover:bg-purple-600 mt-8'>Create Employer</button>
            </form>

            <img src={createBg} alt='Workplace' className='absolute w-3/6 h-full object-cover right-0 md:hidden' />

        </div>
    )
}

export default CreateEmployer;
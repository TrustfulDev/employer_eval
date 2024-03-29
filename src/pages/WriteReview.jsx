import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarRating } from "../components";
import { createBg } from '../assets';
import { createReview } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const WriteReview = () => {
    // establishes variables that will be needed for component to function properly
    const location = useLocation();
    const currState = location.state;

    const auth = getAuth();
    const navigate = useNavigate();
    const [reviewInfo, setReviewInfo] = useState({
        payRating: 0,
        difficultyRating: 0,
        enjoymentRating: 0,
        flexibilityRating: 0,
        lifeWorkRating: 0,
        cultureRating: 0,
        diversityRating: 0,
        comments: '',
        employerID: "",
        userID: "",
        firstName: "",
        lastName: "",
    });

    // Handles input changes (updates page based on user input)
    const inputChange = (e) => {
        const { name, value } = e.target;
        setReviewInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleRatingChange = (rating, category) => { // Handles rating changes
        setReviewInfo((prevReviewInfo) => ({
          ...prevReviewInfo,
          [category]: rating,
        }));
    };

    const handleCreate = (e) => { // Creates review document inside review collection in Firebase
        e.preventDefault();
        createReview(reviewInfo);
        navigate("/");
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {     // User is signed in
            //tracks userID and employerID inside review document for reference outside page
              setReviewInfo(prevData => ({ ...prevData, "userId": user.uid}));
              setReviewInfo(prevData => ({ ...prevData, "employerId": currState.id }));
            }
          });
    }, [])

    return (
        <div className='min-h-screen relative'>
            <form onSubmit={handleCreate} className='absolute w-3/6 h-full pt-20 px-8 md:w-full'>
                <h1 className='text-6xl lg:text-3xl'>Your review</h1>
                <hr className='mb-8'/>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='zipCode'>Pay</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'payRating')} />
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='employerName'>Difficulty</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'difficultyRating')} />
                    </div>
                </div>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='streetAddress'>Enjoyment</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'enjoymentRating')} />
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='city'>Flexibility</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'flexibilityRating')} />
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='streetAddress'>Life-Work Balance</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'lifeWorkRating')}/>
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='streetAddress'>Culture</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'cultureRating')}/>
                    </div>
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor='state'>Diversity</label>
                    <div className="mt-2">
                        <StarRating onRatingChange={(rating) => handleRatingChange(rating, 'diversityRating')}/>
                    </div>
                </div>
                
                <div className='flex flex-col mb-4'>
                    <label htmlFor='rating'>Additional comments</label>
                    <div className="mt-2">
                        <textarea
                            id='comments'
                            name='comments'
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
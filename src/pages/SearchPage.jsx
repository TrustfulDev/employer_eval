/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mcdonalds } from "../assets";
import { Filter, SearchCard } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const SearchPage = () => {
    const { state } = useLocation();
    const auth = getAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([{}]);
    const [newData, setNewData] = useState([]);
    const [reviewsData, setReviewsData] = useState([{}]);
    const [currCity, setCurrCity] = useState();
    const [currState, setCurrState] = useState();

    const calculateAvgRatings = () => {
        newData.forEach((item) => {
            const matchingReviews = reviewsData.filter((review) => review.employerID === item.id);
          
            if (matchingReviews.length > 0) {
                let paySum = 0;
                let difficultySum = 0;
                let enjoymentSum = 0;
                let flexibilitySum = 0;
                let lifeWorkSum = 0;
                let cultureSum = 0;
                let diversitySum = 0;
            
                matchingReviews.forEach((review) => {
                    paySum += review.payRating;
                    difficultySum += review.difficultyRating;
                    enjoymentSum += review.enjoymentRating;
                    flexibilitySum += review.flexibilityRating;
                    lifeWorkSum += review.lifeWorkRating;
                    cultureSum += review.cultureRating;
                    diversitySum += review.diversityRating;
                });
            
                const averagePayRating = paySum / matchingReviews.length;
                const averageDifficultyRating = difficultySum / matchingReviews.length;
                const averageEnjoymentRating = enjoymentSum / matchingReviews.length;
                const averageFlexibilityRating = flexibilitySum / matchingReviews.length;
                const averageLifeWorkRating = lifeWorkSum / matchingReviews.length;
                const averageCultureRating = cultureSum / matchingReviews.length;
                const averageDiversityRating = diversitySum / matchingReviews.length;

                let sum = averagePayRating + averageDifficultyRating + averageEnjoymentRating + averageFlexibilityRating + averageLifeWorkRating + averageCultureRating + averageDiversityRating;
                let temp = sum / 7;
                const avgRating = Number(temp.toFixed(1));
                item.rating = avgRating;
            }
          });

    };

    const fetchEmployers = async () => {
        await getDocs(collection(db, "employer"))
            .then((querysnapshot) => {
                const buffer = querysnapshot.docs.map((doc) => ({
                    name: doc.data().employerName,
                    addr: doc.data().streetAddress,
                    rating: doc.data().rating,
                    city: doc.data().city,
                    state: doc.data().state,
                    id: doc.id
                }
            ));
            setData(buffer);
        })
    }

    const fetchReviews = async () => {
        await getDocs(collection(db, "review"))
            .then((querysnapshot) => {
                const buffer = querysnapshot.docs
                    .filter((doc) => doc.data().employerID)
                    .map((doc) => ({
                        payRating: doc.data().payRating,
                        difficultyRating: doc.data().difficultyRating,
                        enjoymentRating: doc.data().enjoymentRating,
                        flexibilityRating: doc.data().flexibilityRating,
                        lifeWorkRating: doc.data().lifeWorkRating,
                        cultureRating: doc.data().cultureRating,
                        diversityRating: doc.data().diversityRating,
                        comments: doc.data().comments,
                        employerID: doc.data().employerID,
                        userID: doc.data().userID,
                    }));
                    setReviewsData(buffer);
        })
    }

    useEffect(()=>{
        let buffer = state.value.split(',');
        setCurrCity(buffer[0]);
        setCurrState(buffer[1].replace(/\s/g,''));
        onAuthStateChanged(auth, (user) => {
            if (user) {     // User is signed in
              fetchEmployers();
              fetchReviews();
            }
        });
    }, []);

    useEffect(() => {
        if (data.length > 1) {
            data.forEach(e => {
                if (e.city === currCity && e.state === currState) {
                    setNewData(prevData => [...prevData, e]);
                }
            })
        }
    }, [data])
    calculateAvgRatings();

    const parentCallback = (name, addr, rating, desc, id) => {
        navigate("/employer", { state : { name: name, addr: addr, rating: rating, desc: desc, id: id }});
    }

    return (
        <section className='min-h-screen pt-20 px-10 pb-5 md:px-2'>
            <div className='mb-5'>
                <div className='flex justify-between items-center pr-12 mb-4'>
                    <div>
                        <h1 className='text-6xl mb-3 lg:text-4xl xsm:text-2xl'>{state.value}</h1>

                        <div className='flex gap-[1rem] mb-4'>
                            <Filter options={["Industry", "Fast Food", "Retail", "Tech", "Medical"]}/>
                            <Filter options={["Salary", "Descending", "Ascending"]}/>
                            <Filter options={["Rating", "1", "2", "3", "4", "5"]}/>
                        </div>

                        <Link to="/create" className="px-4 py-2 rounded-[5px] border-[1px] border-purple-700 flex justify-center items-center hover:bg-purple-700/[.25]">Add Employer</Link>
                    </div>

                    <h1 className='text-5xl lg:text-3xl sm:hidden min-w-[18rem] lg:min-w-[12rem] ml-2'>- {newData.length} Results -</h1>
                </div>

                <form>
                    <input
                        type="search"
                        placeholder="Search employer"
                        className='w-full rounded px-4 py-2.5 bg-white text-gray-900'
                    />

                    <input type='submit' className='hidden' />
                </form>
            </div>

            <div className='flex flex-wrap gap-5 justify-center'>
                { newData.length === 0 ? "" :
                    newData.map((employer, index) => {
                        return (
                            <SearchCard img={mcdonalds} 
                                id={employer.id}
                                alt="image of employer" 
                                employer={employer.name}
                                address={employer.addr}
                                score={employer.rating} 
                                parentCallback={parentCallback}        
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default SearchPage;
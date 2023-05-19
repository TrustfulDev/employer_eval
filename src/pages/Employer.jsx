import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { ScoreCircle, ReviewBox } from "../components";
import { Link, useLocation } from "react-router-dom";
import { mcdonalds } from "../assets";

ChartJS.register( 
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const options = { // options for radar chart to be displayed as we want it to
    plugins: {
        legend: {
          display: false,
        },
    },
    scales: {
        r: {
            max: 5, // max value of chart
            min: 0, // min value of chart
            grid: {
                color: 'rgba(240, 240, 240, 0.6)', // change the color of grid lines to white
            },
            angleLines: {
                color: 'rgba(240, 240, 240, 0.6)', // change the color of angle lines to white
            },
            ticks: {
                color: 'rgba(240, 240, 240, 0.6)', // change the color of tick marks to white
                stepSize: 1,
                display: false,
            },
            pointLabels: {
                color: 'rgba(250, 250, 250, 0.8)', // change the color of the labels to white
                font: {
                  size: 12, // adjust the font size of the labels
                  family: 'Rubik, sans-serif',
                },
            },
        }
    },
};

const Employer = () => {
    const location = useLocation();
    const currState = location.state;
    const [data, setData] = useState([{}]);
    const [avgRating, setAvgRating] = useState([]);
    const [reviewData, setReviewData] = useState(null);

    const calculateSingleAvgRating = () => { // calculates the average rating of a single review to display
        data.forEach((item) => {
            let sum = item.payRating + item.difficultyRating + item.enjoymentRating + item.flexibilityRating + item.lifeWorkRating + item.cultureRating + item.diversityRating;
            let length = 7;
            const temp = sum / length;
            const avgRating = Number(temp.toFixed(1));
            item.avgScore = avgRating;
        });
    }

    const calculateAvgRatings = () => { // calculates the average ratings of all categrories separately for radar chart to use
        let paySum = 0;
        let difficultySum = 0;
        let enjoymentSum = 0;
        let flexibilitySum = 0;
        let lifeWorkSum = 0;
        let cultureSum = 0;
        let diversitySum = 0;
        let items = data.length;
        data.forEach((item) => {
          paySum += item.payRating;
          difficultySum += item.difficultyRating;
          enjoymentSum += item.enjoymentRating;
          flexibilitySum += item.flexibilityRating;
          lifeWorkSum += item.lifeWorkRating;
          cultureSum += item.cultureRating;
          diversitySum += item.diversityRating;
        });

        const avgDifficultyRating = difficultySum / items;
        const avgPayRating = paySum / items;
        const avgEnjoymentRating = enjoymentSum / items;
        const avgFlexibilityRating = flexibilitySum / items;
        const avgLifeWorkRating = lifeWorkSum / items;
        const avgCultureRating = cultureSum / items;
        const avgDiversityRating = diversitySum / items;

        return [
            avgDifficultyRating,
            avgEnjoymentRating,
            avgFlexibilityRating,
            avgLifeWorkRating,
            avgCultureRating,
            avgDiversityRating,
            avgPayRating,
        ];

    };

    useEffect(()=>{
        const fetchReviews = async () => { //fetches reviews of current employer from Firebase
            await getDocs(collection(db, "review"))
            .then((querysnapshot) => {
                const buffer = querysnapshot.docs
                    .filter((doc) => doc.data().employerID === currState.id)
                    .map((doc) => ({
                        payRating: doc.data().payRating,
                        difficultyRating: doc.data().difficultyRating,
                        enjoymentRating: doc.data().enjoymentRating,
                        flexibilityRating: doc.data().flexibilityRating,
                        lifeWorkRating: doc.data().lifeWorkRating,
                        cultureRating: doc.data().cultureRating,
                        diversityRating: doc.data().diversityRating,
                        comments: doc.data().comments,
                        userID: doc.data().userID,
                        avgScore: 0,
                    }));
                    setData(buffer); // stores review information in data variable
            })
        }
        fetchReviews();
    }, []);

    useEffect(()=>{
        const avgRating = calculateAvgRatings(); // updates average rating values when data changes (reviews are added/changed)
        calculateSingleAvgRating();
        setAvgRating(avgRating);
    }, [data]);

    useEffect(()=> {
        // sets information for radar chart to be displayed properly which updates whenever the overall average rating of the employer changes
        let reviewData = {
            labels: ['Difficulty', 'Enjoyment', 'Flexibility', 'Life-Work Balance', 'Culture', 'Diversity', 'Pay'],
            datasets: [
            {
                label: 'Rating',
                data: avgRating,
                backgroundColor: 'rgba(141, 118, 232, 0.2)',
                borderColor: 'rgba(171, 118, 232, 1)',
                borderWidth: 1,
            },
            ],
        }
        setReviewData(reviewData);
    }, [avgRating]);

    return (
        <section className="min-h-screen pt-20 px-10 pb-5 md:px-2">
            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="mt-3">
                    <div className="mb-5">
                        <h1 className="text-5xl inline-block">
                            {currState.name}
                        </h1>
                        <p className="inline-block ml-4">{currState.addr}</p>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <img src={mcdonalds} alt="" className="rounded-[20px] max-w-[500px] h-full object-cover border-2 border-white-300"/>
                        </div>
                        <div className="flex flex-col w-1/6">
                            <img src={mcdonalds} alt="" className="rounded-[15px] aspect-square object-cover mb-4 w-[100px] h-[100px] border-2 border-white-300" />
                            <img src={mcdonalds} alt="" className="rounded-[15px] aspect-square object-cover mb-4 w-[100px] h-[100px] border-2 border-white-300" />
                            <div className="relative">
                                <div className="rounded-[15px] w-[100px] h-[100px] border-2 border-white-300">
                                    <img src={mcdonalds} alt="" className="rounded-[15px] aspect-square object-cover w-[100px] h-[100px] blur-sm"/>
                                    <div className="absolute inset-0 mr-2 flex items-center justify-center">
                                        <p className="text-white text-lg font-bold">More</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl mb-2 inline-block">
                        Employer Score: 
                    </h1>
                    <div className="inline-block ml-4 mb-3">
                        { 
                            <ScoreCircle
                                employer={currState.employer}
                                address={currState.addr}
                                score={currState.rating}
                            />
                        }
                    </div>
                    <p className="border-t-2 border-white"></p>
                    <div className="w-[400px] h-[400px] mx-auto">
                        {reviewData ? (
                            <Radar data={reviewData} options={options} />
                            ) : (
                            <p>Loading review data...</p>
                        )}
                    </div>
                </div>
                <div className = "">
                    <h1 className="text-4xl mb-2">
                        Details
                    </h1>
                    <p className="border-t-2 border-white h-3"></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="">
                    <div className="flex justify-between">
                        <h1 className="text-4xl mb-2 inline-block">
                            Reviews
                        </h1>
                        <Link to="/write" state={ currState } className="inline-block mt-6 text-purple-500 hover:text-purple-700">Worked here before? Click here to write a review!</Link>
                    </div>
                    <p className="border-t-2 border-white h-3"></p>
                    <div className='flex flex-wrap mt-4 gap-6 justify-center'>
                        { data.length === 0 ? "" :
                            data.map((review, index) => {
                                return (
                                    <ReviewBox
                                        payRating={review.payRating}
                                        difficultyRating={review.difficultyRating}
                                        enjoymentRating={review.enjoymentRating}
                                        flexibilityRating={review.flexibilityRating}
                                        lifeWorkRating={review.lifeWorkRating}
                                        cultureRating={review.cultureRating}
                                        diversityRating={review.diversityRating}
                                        comments={review.comments}
                                        userID={review.userID}
                                        avgScore={review.avgScore}
                                        currState={currState}
                                    />
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Employer;
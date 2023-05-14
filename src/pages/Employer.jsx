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

import { getFirestore, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { ScoreCircle } from "../components";
import { Link } from "react-router-dom";
import { mcdonalds } from "../assets";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const dummyData = [
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
]

const data = {
    labels: ['Difficulty', 'Enjoyment', 'Flexibility', 'Life-Work Balance', 'Culture', 'Diversity', 'Pay'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 2, 3, 4, 5, 1, 2],
        backgroundColor: 'rgba(141, 118, 232, 0.2)',
        borderColor: 'rgba(171, 118, 232, 1)',
        borderWidth: 1,
      },
    ],
};

const options = {
    plugins: {
        legend: {
          display: false,
        },
    },
    scales: {
        r: {
            max: 5,
            min: 0,
            grid: {
                color: 'rgba(240, 240, 240, 0.6)', // Change the color of grid lines to white
            },
            angleLines: {
                color: 'rgba(240, 240, 240, 0.6)', // Change the color of angle lines to white
            },
            ticks: {
                color: 'rgba(240, 240, 240, 0.6)', // Change the color of tick marks to white
                stepSize: 1,
                display: false,
            },
            pointLabels: {
                color: 'rgba(250, 250, 250, 0.8)', // Change the color of the labels to white
                font: {
                  size: 12, // Adjust the font size of the labels
                  family: 'Rubik, sans-serif',
                },
            },
        }
    },
};

const Employer = () => {

    return (
        <section className="min-h-screen pt-20 px-10 pb-5 md:px-2">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                <div className="">
                    <div className="mt-3">
                        <div className="mb-5">
                            <h1 className="text-5xl inline-block">
                                Employer Name
                            </h1>
                            <p className="inline-block ml-4">Employer Location</p>
                        </div>
                        <div className="flex mr-12">
                            <div className="w-5/6">
                                <img src={mcdonalds} alt="Main Image" className="rounded-[20px] h-[400px] max-w-[500px] h-full object-cover border-2 border-white-300"/>
                            </div>
                            <div className="flex flex-col w-1/6">
                                <img src={mcdonalds} alt="Image 1" className="rounded-[15px] aspect-square object-cover mb-4 w-[100px] h-[100px] border-2 border-white-300" />
                                <img src={mcdonalds} alt="Image 2" className="rounded-[15px] aspect-square object-cover mb-4 w-[100px] h-[100px] border-2 border-white-300" />
                                <div className="relative">
                                    <div className="rounded-[15px] w-[100px] h-[100px] border-2 border-white-300">
                                        <img src={mcdonalds} alt="Image 3" className="rounded-[15px] aspect-square object-cover w-[100px] h-[100px] blur-sm"/>
                                        <div className="absolute inset-0 mr-2 flex items-center justify-center">
                                            <p className="text-white text-lg font-bold">More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <h1 className="text-4xl mb-2 inline-block">
                            Employer Score: 
                        </h1>
                        <div className="inline-block ml-4 mb-3">
                            { dummyData.map((employer, index) => {
                                return (
                                    <ScoreCircle
                                    employer={employer.employer}
                                    address={employer.address}
                                    score={employer.score}            
                                    key={index}/>
                                )
                            })}
                        </div>
                        <p className="border-t-2 border-white"></p>
                        <div className="w-[400px] h-[400px] mx-auto">
                            <Radar data={data} options={options} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className = "">
                        <h1 className="text-4xl mb-2">
                            Details
                        </h1>
                        <p className="border-t-2 border-white h-3"></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="flex justify-between">
                            <h1 className="text-4xl mb-2 inline-block">
                                Reviews
                            </h1>
                            <p className="inline-block mt-6">Worked here before? Click <Link to='/' className="">here</Link> to write a review!</p>
                        </div>
                        <p className="border-t-2 border-white h-3"></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const getData = async () => {
    const db = getFirestore();
    const colRef = collection(db, "employer");
    try {
        onSnapshot(colRef, docsSnap => {
            docsSnap.forEach(doc => {
                console.log(doc.data());
                const city = doc.get("city");
                const name = doc.get("employerName");
                const rating = doc.get("rating");
                const state = doc.get("state");
                const address = doc.get("streetAddress");
                const zip = doc.get("zipCode");
            })
        })
    } catch (error) {
        console.log(error);
    }
}

export default Employer;
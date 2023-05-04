import { getFirestore, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { ScoreCircle } from "../components";
import { Link } from "react-router-dom";

const dummyData = [
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
]

const Employer = () => {

    return (
        <section className="min-h-screen pt-20 px-10 pb-5 md:px-2">
            <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                <div class="">
                    <div className="">
                        <h1 className="text-5xl relative">
                            Employer Name
                        </h1>
                        <p>Employer Location</p>
                        </div>
                </div>
                <div class="">
                    <div className="">
                        <h1 className="text-5xl mb-2 inline-block">
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
                        <p className="border-t-2 border-white h-2"></p>
                        <p>score</p>
                    </div>
                </div>
                <div class="">
                    <div className = "">
                        <h1 className="text-5xl mb-2">
                            Details
                        </h1>
                        <p className="border-t-2 border-white h-3"></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div class="">
                    <div className="">
                        <div className="flex justify-between">
                            <h1 className="text-5xl mb-2 inline-block">
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
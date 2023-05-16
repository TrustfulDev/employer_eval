import { db } from '../firebase';
import { getFirestore, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { ScoreCircle } from "../components";
import { Link, useLocation } from "react-router-dom";

const ReviewBox = ({payRating, difficultyRating, enjoymentRating, flexibilityRating, lifeWorkRating, cultureRating, diversityRating, comments, userID}) => {
    const [userData, setUserData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fetchUser = async () => {
        await getDocs(collection(db, "user"))
            .then((querysnapshot) => {
                const buffer = querysnapshot.docs
                .filter((doc) => doc.data().uid === userID)
                .map((doc) => ({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName
                }));
                setUserData(buffer);
        })
    }

    useEffect(() => {
        fetchUser();
    }, [userID]);
    
    useEffect(() => {
        if (userData.length > 0) {
          setFirstName(userData[0].firstName);
          setLastName(userData[0].lastName);
        }
    }, [userData]);

    return (
        <div className="flex justify-between w-full h-[200px] purple-backround rounded-[10px] relative xsm:w-[347px] xsm:h-[358px]">
            <div className="grid grid-rows-3 gap-2">
                <div className="flex items-center justify-between px-[5px]">
                    <p>{firstName} {lastName}</p>
                </div>
                <div className="flex items-center justify-between px-[5px]">
                    <div className="grid grid-cols-4 grid-rows-2 gap-2">
                        <p>Pay: {payRating} </p> 
                        <p>Difficulty: {difficultyRating} </p> 
                        <p>Enjoyment: {enjoymentRating} </p> 
                        <p>Flexibility: {flexibilityRating} </p> 
                        <p>Life-Work: {lifeWorkRating} </p> 
                        <p>Culture: {cultureRating} </p> 
                        <p>Diversity: {diversityRating}</p>
                    </div>
                </div>
                <div className="flex justify-between px-[5px]">
                    <p className = "text-[20px] w-full h-full flex items-center">Comments:</p>
                </div>
                <p className = "mt-2">{comments}</p>
            </div>
        </div>
    );

}

export default ReviewBox;
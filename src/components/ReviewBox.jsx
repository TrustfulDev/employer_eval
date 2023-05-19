import { db } from '../firebase';
import { getFirestore, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { MdAccountBox } from "react-icons/md";
import { ScoreCircle } from "../components";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link, useLocation } from "react-router-dom";
import { blue } from '@mui/material/colors';

const ReviewBox = ({payRating, difficultyRating, enjoymentRating, flexibilityRating, lifeWorkRating, cultureRating, diversityRating, comments, userID, avgScore, currState}) => {
    const [userData, setUserData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
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
    useEffect(() => {
        setIsLoading(false); // Mark loading as false when score data is available
      }, [
        payRating,
        difficultyRating,
        enjoymentRating,
        flexibilityRating,
        lifeWorkRating,
        cultureRating,
        diversityRating
      ]);

    return (
        <div className="flex flex-wrap w-full h-full black-gradient rounded-[10px] relative xsm:w-[347px] xsm:h-[358px]">
            <div className="grid grid-rows-2 gap-2">
                <div className="flex items-center mt-5">
                    <div className="ml-3 inline-block">
                        { 
                            <MdAccountBox className="w-[75px] h-[75px] lg:hidden" />
                        }
                    </div>
                    <div className="ml-4 inline-block">
                        <p className='text-[20px] font-bold'>{firstName} {lastName}</p>
                                  
                    </div>
                    <div className="inline-block ml-4">
                        {!isLoading && (
                            <ScoreCircle
                                employer={currState.employer}
                                address={currState.addr}
                                score={avgScore}
                                className="w-[20px] h-[20px]"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full px-2 mt-1 ml-3">
                    <div className="grid grid-cols-4 grid-rows-2 gap-8 relative xsm:grid-cols-3">
                        <div className='flex-cols'>
                            <p>Pay: </p> 
                            {payRating !== null && typeof payRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={payRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Difficulty: </p>
                            {difficultyRating !== null && typeof difficultyRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={difficultyRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Enjoyment: </p> 
                            {enjoymentRating !== null && typeof enjoymentRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={enjoymentRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Flexibility: </p>
                            {flexibilityRating !== null && typeof flexibilityRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={flexibilityRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Life-Work: </p>
                            {lifeWorkRating !== null && typeof lifeWorkRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={lifeWorkRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Culture: </p>
                            {cultureRating !== null && typeof cultureRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={cultureRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                        <div className='flex-cols'>
                            <p>Diversity: </p>
                            {diversityRating !== null && typeof diversityRating !== 'undefined' ? (
                                <Rating
                                    name="read-only"
                                    value={diversityRating}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                                ) : (
                                <Rating
                                    name="read-only"
                                    value={0}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarIcon style={{ color: '#bbb', opacity: 0.55 }} fontSize="inherit" />}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-cols w-full ml-5">
                    <div className="">
                        <p className="text-[20px] w-full h-full items-center">Comments:</p>
                    </div>
                    <p className="mb-5 flex-wrap pr-8">{comments}</p>
                </div>
            </div>
        </div>
    );

}

export default ReviewBox;
import { tulip } from "../assets";
import { AiFillEdit } from "react-icons/ai"
import { MdAccountBox } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ReviewBox, BookmarkBox } from "../components";

const Account = () => {

const [activeTab, setActiveTab] = useState("profile");

const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  
  const navigate = useNavigate();
  const auth = getAuth();
  const [name, setName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [bookmark, setBookmark]  = useState([]);
  const [uid, setUID]  = useState([]);
  const [currUser, setCurrUser] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const [allUsers, setAllUsers] = useState([{}]);
  const [allReviews, setAllReviews] = useState([{}]);
  const [comments, setComments] = useState([]);
  const [cultureRating, setcultureRating] = useState([]);
  const [difficultyRating, setdifficultyRating] = useState([]);
  const [diversityRating, setdiversityRating] = useState([]);
  const [enjoymentRating, setenjoymentRating] = useState([]);
  const [flexibilityRating, setflexibilityRating] = useState([]);
  const [lifeWorkRating, setlifeWorkRating] = useState([]);
  const [payRating, setpayRating] = useState([]);
  const [userID, setuserID] = useState([]);
  const [bookmarks, setBookmarks] = useState(null);

  // Runs immediately on start, finds the logged in user
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {     // User is signed in
          setCurrUser(user.uid);
          setCurrEmail(user.email);
          var uid = user.uid;
          fetchName();
        } else {
          setCurrUser('');
          setCurrEmail('');
          navigate('/');
        }
      });
    }, []);

  // Fetches the user information
  const fetchName = async () => {
    await getDocs(collection(db, "user"))
      .then((querysnapshot) => {
        const buffer = querysnapshot.docs.map((doc) => ({
          email:doc.data().email, 
          firstName:doc.data().firstName,
          lastName:doc.data().lastName,
          bookmark:doc.data().bookmark,
          id:doc.data().uid,

        }));              
        setAllUsers(buffer);
      });

      
  }

  // Fetches the reviews corresponding to the user
  const fetchReview = async () => {
    await getDocs(collection(db, "review"))
      .then((querysnapshot) => {
        const buffer = querysnapshot.docs
        .filter((doc) => doc.data().userID === uid)
        .map((doc) => ({
          userID:doc.data().userID, 
          employerID:doc.data().employerID, 
          comments:doc.data().comments,
          cultureRating:doc.data().cultureRating,
          difficultyRating:doc.data().difficultyRating,
          diversityRating:doc.data().diversityRating,
          enjoymentRating:doc.data().enjoymentRating,
          flexibilityRating:doc.data().flexibilityRating,
          lifeWorkRating:doc.data().lifeWorkRating,
          payRating:doc.data().payRating,
          avgScore : 0,
         
        }));              
        setAllReviews(buffer);
      });
  }

  // Fetches the bookmarks corresopnding to the user
  const fetchBookmarks = async () => {
    await getDocs(collection(db, "bookmarks"))
      .then((querysnapshot) => {
        const buffer = querysnapshot.docs
          .filter((doc) => doc.data().userID === String(currUser))
          .map((doc) => ({
            employerID: doc.data().employerID,
            id: doc.id,
          }));

        setBookmarks(buffer);
      })
  }

  // Used to refresh the bookmarks when one is removed
  const updateBook = () => {
    setBookmarks(null);
    fetchBookmarks();
  }

  // Runs when allUsers or allReviews variable changes, sets the bookmarks and reviews
  useEffect(() => {
    if (allUsers.length > 1)
      allUsers.forEach(e => e.email.toLowerCase() === currEmail.toLowerCase() ? (setName(e.firstName), setLastName(e.lastName), setBookmark(e.bookmark), setUID(e.id)) : "");
    if (allReviews.length > 1)
      allReviews.forEach(a => a.userID === uid ? (setuserID(a.userID), setComments(a.comments), setcultureRating(a.cultureRating), setdifficultyRating(a.difficultyRating), setdiversityRating(a.diversityRating), setenjoymentRating(a.enjoymentRating), setflexibilityRating(a.flexibilityRating), setlifeWorkRating(a.flexibilityRating), setlifeWorkRating(a.lifeWorkRating), setpayRating(a.payRating)) : "");
  }, [allUsers] [allReviews])

    return (
    // First of three divs which divide the page into 3 columns, this first column contains the profile pic, username, profile, bookmarks etc 
    <div className="flex justify-center md:flex-col md:items-center md:mx-4">    
        {/* Div containing the profile pic, username, and name of user */}
        <div className=" w-96 absolute left-[130px] h-full xl:left-[25px] lg:left-0 md:relative">
            <div className="flex flex-col">
                <MdAccountBox className="mt-24 w-[299px] h-[299px] lg:hidden" />
                <div className="lg:mt-36 md:hidden">
                    <h2 className="ml-12 text-[32px] lg:text-[28px]"> {name} {lastName} </h2>
                    <h2 className="ml-12 text-[24px] text-gray-400">  </h2>
                </div>
                <hr className="my-[20px] w-[150px] ml-[50px] bg-purple-700 border-none h-[1px] lg:w-[100px] md:hidden"/>
                {/* Profile, bookmark, Reviews div */}
                <div className="md:flex md:gap-4 md:mt-20 md:justify-center">
                    <h2 className={`ml-12 text-[28px] lg:text-[24px] md:ml-0 ${activeTab === "profile" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => handleTabClick("profile")}> Profile </h2>
                    <h2 className={`ml-12 py-2 text-[28px] lg:text-[24px] md:ml-0 md:py-0 ${activeTab === "bookmarks" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => {handleTabClick("bookmarks"); fetchBookmarks();}}> Bookmarks </h2>
                    <h2 className={`ml-12 text-[28px] lg:text-[24px] md:ml-0 ${activeTab === "reviews" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => {handleTabClick("reviews"); fetchReview();}}> Reviews </h2>
                </div>
            </div>
        </div>
        
        {/* Active tab functions to allow the rerendering of the page when a user clicks on profile, bookmarks, or reviews */}
        {activeTab === "profile" && 
            <div className=" flex flex-col relative w-1/3 min-w-[350px] pt-32 gap-16 h-full md:pt-4">
                <div className=" w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem] lg:px-[2rem]">
                    <h1 className="text-3xl mb-8"> Profile Details </h1>
                    <ul className="list-userInfo">
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> First Name: {name} <AiFillEdit className="inline-block " /> </li>
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Last Name: {lastName} <AiFillEdit className="inline-block " /> </li>
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Email: {currEmail} <AiFillEdit className="inline-block " /> </li>
                    </ul>
                    
                </div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
            </div>
        }
        {activeTab === "bookmarks" && 
            <div className=" flex flex-col relative w-1/3 min-w-[355px] pt-32 gap-16 h-full md:pt-4">
                <div className=" w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]">
                    <h1 className="text-3xl"> Bookmarked Employers </h1>
                    {
                      bookmarks !== null ? bookmarks.map((e, index) => {
                        return (
                          <BookmarkBox employer={e.employerID} id={e.id} parentCallback={updateBook} key={index} />
                        )
                      })
                      :
                      <h1 className="text-xl mt-4">Nothing Here!</h1>
                    }
                </div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
            </div>
        }
        {activeTab === "reviews" && 
            <div className=" flex flex-col relative w-1/3 min-w-[355px] pt-32 gap-16 h-full md:pt-4">
                <div className=" w-full h-full purple-backround rounded-3xl px-[3rem] py-[2rem]">
                    <h1 className="text-3xl"> Your Reviews </h1>
                    <div className="mt-6">
                    { allReviews.length === 0 ? "" :
                            allReviews
                            .filter((review) => review.userID === uid)
                            .map((review, index) => {
                              const averageScore =
                                (review.payRating +
                                review.difficultyRating +
                                review.enjoymentRating +
                                review.flexibilityRating +
                                review.lifeWorkRating +
                                review.cultureRating +
                                review.diversityRating) /
                                7;
                                return (
                                  <div key={index} style={{ marginBottom: "1.5rem" }}>
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
                                        avgScore={averageScore.toFixed(1)}
                                        currState={""}
                                        
                                        
                                    />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
            </div>
        }
        
        {/* Left tulips */}
        <img src={tulip} alt="tulip" className="absolute bottom-0 left-[256px] w-[183px] h-[180px] xl:w-[133px] xl:h-[130px] xl:left-24 pointer-events-none" />
        <img src={tulip} alt="tulip" className="absolute bottom-0 left-[16px] w-[257px] h-[253px] opacity-10 xl:w-[207px] xl:h-[203px] xl:left-[-50px] pointer-events-none" />

        {/* Right tulips */}
        <img src={tulip} alt="tulip" className="absolute bottom-0 right-28 w-[183px] h-[180px] xl:w-[133px] xl:h-[130px] pointer-events-none" />
        <img src={tulip} alt="tulip" className="absolute bottom-0 right-[-55px] w-[257px] h-[253px] opacity-10 xl:w-[207px] xl:h-[203px] pointer-events-none" />

    </div>
    )
}

export default Account;


// Name: {editingField === 'name' ? <input type="text" value={name} onChange={(e) => handleFieldChange('name', e.target.value)} /> : <>{name} <AiFillEdit className="inline-block" onClick={() => handleEditClick('name')} /></>}
// {editingField !== null && <button className="ml-14 px-4 py-2 rounded-lg bg-green-500 text-white mt-4" onClick={handleSaveClick}>Save</button>}
import { useState, useEffect } from 'react';
import { HiBookmark } from 'react-icons/hi2';
import { createBookmark } from "../firebase";
import { getAuth } from "@firebase/auth";
import { db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';

const SearchCard = ({ id, img, alt, employer, address, score, parentCallback }) => {
    // 1-2 will be red (bg-red-400), 3 will be orange (bg-orange-400), 4-5 will be green (bg-green-400)
    const [color, setColor] = useState("bg-red-400");
    const [checked, setChecked] = useState(false);
    const [allBookmarks, setAllBookmarks] = useState([{}])
    const auth = getAuth();

    const fetchBookmarks = async () => {
        await getDocs(collection(db, "bookmarks"))
            .then((querysnapshot) => {
                const buffer = querysnapshot.docs.map((doc) => ({
                    userID: doc.data().userID,
                    employerID: doc.data().employerID,
                }));
                setAllBookmarks(buffer);
            })
    }

    useEffect(() => {
        if (allBookmarks.length > 1) {
            allBookmarks.forEach(e => {
                if (e.userID === String(auth.currentUser.uid) && e.employerID === String(id)) {
                    setChecked(true);
                }
            })
        }
    }, [allBookmarks])
    
    useEffect(() => {
        if (score <= 2) setColor("bg-red-400")
        else if (score >= 4) setColor("bg-green-400")
        else setColor("bg-orange-400")

        fetchBookmarks();
    }, []);

    const handleBookmark = () => {
        createBookmark(id);
        setChecked(true);
    }

    return (
        <div className="flex flex-col justify-between w-[387px] h-[398px] purple-backround rounded-[30px] p-[20px] relative xsm:w-[347px] xsm:h-[358px] transition-all hover:bg-[#7a5bf54d] hover:scale-105 cursor-pointer">
            <HiBookmark 
                className={ checked ? "hidden" :  "absolute text-3xl top-4 left-10 hover:text-red-500 transition-all"}
                onClick={handleBookmark}
            />
            <img src={img} alt={alt} className="rounded-[30px] min-h-[260px] h-full object-cover xsm:min-h-[220px]"
                onClick={() => parentCallback(employer, address, score, alt, id)}
            />
            <div className="flex justify-between items-center h-full px-[20px]"
                onClick={() => parentCallback(employer, address, score, alt, id)}
            >
                <div>
                    <h1 className = "text-white-500 text-[32px]" >{employer}</h1>
                    <h2 className= "text-gray-400 text-[18px] ml-[2px]">{address}</h2>
                </div>
                <div className={`${color} rounded-full p-[1rem] w-[76px] h-[76px]`}>
                    <p className = "text-[36px] w-full h-full flex justify-center items-center">{score}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
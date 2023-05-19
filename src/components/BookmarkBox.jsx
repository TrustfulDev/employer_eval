import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { ScoreCircle } from '../components';
import { HiBookmarkSlash } from "react-icons/hi2";

const BookmarkBox = (props) => {
    const [realEmployer, setRealEmployer] = useState(null);

    useEffect(() => {
        getEmployer();
    }, [])

    const handleDelete = () => {
        const ref = doc(db, "bookmarks", props.id);
        deleteDoc(ref)
        .then(() => {
            props.parentCallback();
        })
    }

    const getEmployer = async () => {
        await getDocs(collection(db, "employer"))
        .then((querysnapshot) => {
            const buffer = querysnapshot.docs
            .filter((doc) => String(doc.id) === String(props.employer))
            .map((doc) => ({
            name: doc.data().employerName,
            addr: doc.data().streetAddress,
            rating: doc.data().rating
            }))
            setRealEmployer(buffer);
        })
    } 

    return (
        <div className="border-y-4 p-4 mt-2">
            {
                realEmployer !== null ?
                <div className="flex items-center gap-8">
                    <HiBookmarkSlash className="text-2xl cursor-pointer" onClick={handleDelete}/>
                    <div>
                        <h1>{realEmployer[0].name}</h1>
                        <h3>{realEmployer[0].addr}</h3>
                    </div>
                    <ScoreCircle score={realEmployer[0].rating} />
                </div>

                :

                <h1>Loading</h1>
            }
        </div>
    )
}

export default BookmarkBox;
import { hero_illustration, bench, tulip, child_boy, child_girl, man_laptop, pin, woman_laptop } from "../assets";
import { AiFillEdit, IconName } from "react-icons/ai"
import React, { useState } from "react";
import { profilePic } from "../assets";



const Account = () => {

const [activeTab, setActiveTab] = useState("profile");

const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

//   const [editingField, setEditingField] = useState(null);
//   const [name, setName] = useState('Haseeb Sayed');
//   const [username, setUsername] = useState('Ohhaseeb');
//   const [password, setPassword] = useState('xxxxx');
//   const [email, setEmail] = useState('meow46@gmail.com');

//   const handleEditClick = (fieldName) => {
//     setEditingField(fieldName);
//   };

//   const handleFieldChange = (fieldName, value) => {
//     switch (fieldName) {
//       case 'name':
//         setName(value);
//         break;
//       case 'username':
//         setUsername(value);
//         break;
//       case 'password':
//         setPassword(value);
//         break;
//       case 'email':
//         setEmail(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSaveClick = () => {
//     setEditingField(null);
//   };

    return (
    // First of three divs which divide the page into 3 columns, this first column contains the profile pic, username, profile, bookmarks etc 
    <div className="h-screen w-screen flex justify-between">    
        {/* Div containing the profile pic, username, and name of user */}
        <div className=" w-96 ml-12 h-screen ">
            <div className="flex flex-col justify-between ">
            <img src={profilePic} alt="userImage" className="flex rounded-full mt-36 w-64 h-64 mx-16" />
                <div className=" mt-6">
                    <h2 className="ml-16 text-xl"> NAME HERE </h2>
                    <h2 className="ml-16"> username </h2>
                </div>
                
                {/* Profile, bookmark, Reviews div */}
                <div className=" mt-16">
                    <h2 className={`ml-16 py-2 text-xl ${activeTab === "profile" ? "underline" : "text-gray-400"} hover:underline cursor-pointer`} onClick={() => handleTabClick("profile")}> Profile </h2>
                    <h2 className={`ml-16 py-2 text-xl ${activeTab === "bookmarks" ? "underline" : "text-gray-400"} hover:underline cursor-pointer`} onClick={() => handleTabClick("bookmarks")}> Bookmarks </h2>
                    <h2 className={`ml-16 py-2 text-xl ${activeTab === "reviews" ? "underline" : "text-gray-400"} hover:underline cursor-pointer`} onClick={() => handleTabClick("reviews")}> Reviews </h2>
                </div>
                
                {/* Two tulip images at the bottom of the screen */}
                <div className="relative  mt-16 h-60">
                    <img src={tulip} alt="tulip" className="absolute bottom-0 right-0 mr-20 w-32 h-32 " />
                    <img src={tulip} alt="tulip" className="absolute bottom-0 w-48 h-48 opacity-30 " />

                </div>
            </div>
        </div>
        
        {/* Active tab functions to allow the rerendering of the page when a user clicks on profile, bookmarks, or reviews */}
        {activeTab === "profile" && 
            <div >
            
            </div>}
        {activeTab === "bookmarks" && 
            <div className=" flex flex-col relative w-1/2 ml-80 pt-32 gap-16 h-screen">
                <div className=" w-full h-full blackFlip-gradient rounded-3xl">
                    <h1 className="ml-6 pt-6 text-3xl"> Bookmarked Employers </h1>
                </div>
            </div>}
        {activeTab === "reviews" && 
            <div className=" flex flex-col relative w-1/2 ml-80 pt-32 gap-16 h-screen">
            <div className=" w-full h-full blackFlip-gradient rounded-3xl">
                <h1 className="ml-6 pt-6 text-3xl"> Your Reviews </h1>
            </div>
        </div>}
        
        {/* Second of the three column divs which divides the page, this div contains the main information such as profile information */}
        <div className=" flex flex-col relative w-1/3 ml-52 pt-32 gap-16 h-screen">
            <div className=" w-full h-1/2 blackFlip-gradient rounded-3xl ">
                <h1 className="ml-6 pt-6 text-3xl"> Profile Details </h1>
                <ul className="list-userInfo">
                    <li className="flex justify-between ml-14 pt-6 pr-14 text-xl "> Name: Haseeb Sayed <AiFillEdit className="inline-block " /> </li>
                    <li className="flex justify-between ml-14 pt-6 pr-14 text-xl "> Username: Ohhaseeb <AiFillEdit className="inline-block " /> </li>
                    <li className="flex justify-between ml-14 pt-6 pr-14 text-xl "> Password: xxxxx <AiFillEdit className="inline-block " /> </li>
                    <li className="flex justify-between ml-14 pt-6 pr-14 text-xl "> Email: meow46@gmail.com <AiFillEdit className="inline-block " /> </li>
                </ul>
                
            </div>
            <div className=" w-full h-1/2 blackFlip-gradient rounded-3xl "></div>
        </div>
        
        {/* Third column div which contains the two tulip images from the right of the screen */}
        <div className=" relative flex-1 ml-52">
            <img src={tulip} alt="tulip" className="absolute bottom-0 left-0 ml-16 mr-20 w-32 h-32 " />
            <img src={tulip} alt="tulip" className="absolute bottom-0 ml-36 w-48 h-48 opacity-30 " />
        </div>

    </div>
    )
}

export default Account;


// Name: {editingField === 'name' ? <input type="text" value={name} onChange={(e) => handleFieldChange('name', e.target.value)} /> : <>{name} <AiFillEdit className="inline-block" onClick={() => handleEditClick('name')} /></>}
// {editingField !== null && <button className="ml-14 px-4 py-2 rounded-lg bg-green-500 text-white mt-4" onClick={handleSaveClick}>Save</button>}
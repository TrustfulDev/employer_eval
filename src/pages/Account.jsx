import { hero_illustration, bench, tulip, child_boy, child_girl, man_laptop, pin, woman_laptop } from "../assets";
import { AiFillEdit, IconName } from "react-icons/ai"
import { MdAccountBox } from "react-icons/md";
import React, { useState } from "react";

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
    <div className="flex justify-center md:flex-col md:items-center md:mx-4">    
        {/* Div containing the profile pic, username, and name of user */}
        <div className=" w-96 absolute left-[130px] h-full xl:left-[25px] lg:left-0 md:relative">
            <div className="flex flex-col">
                <MdAccountBox className="mt-24 w-[299px] h-[299px] lg:hidden" />
                <div className="lg:mt-36 md:hidden">
                    <h2 className="ml-12 text-[32px] lg:text-[28px]"> NAME HERE </h2>
                    <h2 className="ml-12 text-[24px] text-gray-400"> username </h2>
                </div>
                <hr className="my-[20px] w-[150px] ml-[50px] bg-purple-700 border-none h-[1px] lg:w-[100px] md:hidden"/>
                {/* Profile, bookmark, Reviews div */}
                <div className="md:flex md:gap-4 md:mt-20 md:justify-center">
                    <h2 className={`ml-12 text-[28px] lg:text-[24px] md:ml-0 ${activeTab === "profile" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => handleTabClick("profile")}> Profile </h2>
                    <h2 className={`ml-12 py-2 text-[28px] lg:text-[24px] md:ml-0 md:py-0 ${activeTab === "bookmarks" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => handleTabClick("bookmarks")}> Bookmarks </h2>
                    <h2 className={`ml-12 text-[28px] lg:text-[24px] md:ml-0 ${activeTab === "reviews" ? "" : "text-gray-400"} hover:text-white cursor-pointer`} onClick={() => handleTabClick("reviews")}> Reviews </h2>
                </div>
            </div>
        </div>
        
        {/* Active tab functions to allow the rerendering of the page when a user clicks on profile, bookmarks, or reviews */}
        {activeTab === "profile" && 
            <div className=" flex flex-col relative w-1/3 min-w-[350px] pt-32 gap-16 h-full md:pt-4">
                <div className=" w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem] lg:px-[2rem]">
                    <h1 className="text-3xl mb-8"> Profile Details </h1>
                    <ul className="list-userInfo">
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Name: Haseeb Sayed <AiFillEdit className="inline-block " /> </li>
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Username: Ohhaseeb <AiFillEdit className="inline-block " /> </li>
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Password: ******** <AiFillEdit className="inline-block " /> </li>
                        <li className="flex justify-between text-xl mb-4 lg:text-lg"> Email: meow46@gmail.com <AiFillEdit className="inline-block " /> </li>
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
                </div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
            </div>
        }
        {activeTab === "reviews" && 
            <div className=" flex flex-col relative w-1/3 min-w-[355px] pt-32 gap-16 h-full md:pt-4">
                <div className=" w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]">
                    <h1 className="text-3xl"> Your Reviews </h1>
                </div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
                <div className="w-full h-full blackFlip-gradient rounded-3xl px-[3rem] py-[2rem]"></div>
            </div>
        }
        
        {/* Left tulips */}
        <img src={tulip} alt="tulip" className="absolute bottom-0 left-[256px] w-[183px] h-[180px] xl:w-[133px] xl:h-[130px] xl:left-24" />
        <img src={tulip} alt="tulip" className="absolute bottom-0 left-[16px] w-[257px] h-[253px] opacity-10 xl:w-[207px] xl:h-[203px] xl:left-[-50px]" />

        {/* Right tulips */}
        <img src={tulip} alt="tulip" className="absolute bottom-0 right-28 w-[183px] h-[180px] xl:w-[133px] xl:h-[130px]" />
        <img src={tulip} alt="tulip" className="absolute bottom-0 right-[-55px] w-[257px] h-[253px] opacity-10 xl:w-[207px] xl:h-[203px]" />

    </div>
    )
}

export default Account;


// Name: {editingField === 'name' ? <input type="text" value={name} onChange={(e) => handleFieldChange('name', e.target.value)} /> : <>{name} <AiFillEdit className="inline-block" onClick={() => handleEditClick('name')} /></>}
// {editingField !== null && <button className="ml-14 px-4 py-2 rounded-lg bg-green-500 text-white mt-4" onClick={handleSaveClick}>Save</button>}
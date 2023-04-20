import { useLocation } from 'react-router-dom';
import {  mcdonalds } from "../assets";
import {SearchCard } from "../components";


const SearchPage = () => {
    const { state } = useLocation();

    return (
        
        // <div class="rounded-lg overflow-hidden bg-gray-500 relative absolute top-20 ">
        //      <img src={mcdonalds} class="rounded-t-lg w-1/5 ml-10"/>
        //      <div class="p-3">
        //         <h1 class="text-white text-lg font-bold ml-10">McDonalds</h1>
        //         <p class="text-white text-sm ml-10">Address</p>
        //     </div>
        //     <div class=" p-2 bg-orange-400 rounded-full h-9 w-8 ml-60 absolute bottom-5">
        //         <p class="text-white text-sm ml-50 mb-20">70</p>
        //     </div>
        // </div>
        <SearchCard img={mcdonalds} 
                    alt="image of employer" 
                    employer={"Mcdonalds"}
                    address={"meow avenue 222"}
                    score={"70"}
                                  
                    />


        
        
    )
}

export default SearchPage;
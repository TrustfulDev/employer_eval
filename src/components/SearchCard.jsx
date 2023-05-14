import { useState, useEffect } from 'react';
const SearchCard = ({ id, img, alt, employer, address, score, parentCallback }) => {
    // 1-2 will be red (bg-red-400), 3 will be orange (bg-orange-400), 4-5 will be green (bg-green-400)
    const [color, setColor] = useState("bg-red-400");
    
    useEffect(() => {
        if (score <= 2) setColor("bg-red-400")
        else if (score >= 4) setColor("bg-green-400")
        else setColor("bg-orange-400")
    }, [])

    return (
        <div className="flex flex-col justify-between w-[387px] h-[398px] purple-backround rounded-[30px] p-[20px] relative xsm:w-[347px] xsm:h-[358px] transition-all hover:bg-[#7a5bf54d] hover:scale-105 cursor-pointer"
            onClick={() => parentCallback(employer, address, score, alt, id)}
        >
            <img src={img} alt={alt} className="rounded-[30px] min-h-[260px] h-full object-cover xsm:min-h-[220px]"/>
            <div className="flex justify-between items-center h-full px-[20px]">
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
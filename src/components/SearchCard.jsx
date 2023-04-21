const SearchCard = ({ img, alt, employer, address, score }) => {
    return (
        <div className="flex flex-col justify-between w-[387px] h-[398px] purple-backround rounded-[30px] p-[20px] relative xsm:w-[347px] xsm:h-[358px] transition-all hover:bg-[#7a5bf54d] hover:scale-105 cursor-pointer">
            <img src={img} alt={alt} className="rounded-[30px] min-h-[260px] h-full object-cover xsm:min-h-[220px]"/>
            <div className="flex justify-between items-center h-full px-[26px]">
                <div>
                    <h1 className = "text-white-500 text-[32px]" >{employer}</h1>
                    <h2 className= "text-gray-400 text-[20px] ml-[2px]">{address}</h2>
                </div>
                <div className="bg-orange-400 rounded-full p-[1rem] w-[76px] h-[76px]">
                    <p className = "text-[36px] w-full h-full flex justify-center items-center">{score}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
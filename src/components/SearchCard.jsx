const SearchCard = ({ img, alt, employer, address, score }) => {
    return (
        <div className="w-[422px] h-[422px] purple-backround rounded-3xl py-[25px] px-[36px] relative 2xl:w-[340px] 2xl:h-[340px]">
            <img  src={img} className="rounded-md"/>
            <div className="flex justify-between align-center">
                <div>
                    <h1 className = "text-white-500 mt-2 text-3xl ml-4" >{employer}</h1>
                    <h2 className= "text-gray-400 text-l ml-4 mt-1">{address}</h2>
                </div>
                <p className = "p-4 bg-orange-400 rounded-full text-3xl  mt-4">{score}</p>
            </div>
        </div>
    );
};

export default SearchCard;
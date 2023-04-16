const HomeCard = ({ title, img, alt, position }) => {
    return (
        <div className="w-[422px] h-[422px] card-gradient rounded-3xl py-[25px] px-[36px] relative 2xl:w-[340px] 2xl:h-[340px]">
            <h3 className="font-bold text-[32px] w-11/12 2xl:text-[26px]">{title}</h3>
            <img src={img} alt={alt} className={`w-[186px] absolute ${position} 2xl:w-[150px]`}/>
        </div>
    );
};

export default HomeCard;
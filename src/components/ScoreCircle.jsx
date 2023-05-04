const ScoreCircle = ({ img, alt, employer, address, score }) => {
    return(
        <div className="bg-orange-400 rounded-full p-[1rem] w-[76px] h-[76px]">
            <p className = "text-[36px] w-full h-full flex justify-center items-center">{score}</p>
        </div>
    );
}

export default ScoreCircle;
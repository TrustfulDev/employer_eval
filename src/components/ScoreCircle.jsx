import React, {useState, useEffect} from "react";

const ScoreCircle = ({ img, alt, employer, address, score }) => {
    const [color, setColor] = useState("bg-red-400");

    useEffect(() => {
        if (score <= 2) setColor("bg-red-400")
        else if (score >= 4) setColor("bg-green-400")
        else setColor("bg-orange-400")
        
    }, []);

    return(
        <div className={`${color} rounded-full p-[1rem] w-[76px] h-[76px]`}>
            <p className = "text-[36px] w-full h-full flex justify-center items-center">{score}</p>
        </div>
    );
}

export default ScoreCircle;
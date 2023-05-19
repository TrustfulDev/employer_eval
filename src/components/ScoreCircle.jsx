import React, {useState, useEffect} from "react";

const ScoreCircle = ({ img, alt, employer, address, score }) => {
    // reactive color variable that changes based on score of review/employer, default color is red
    const [color, setColor] = useState("bg-red-400");

    useEffect(() => { // changes color of circle to be red if score is less than or equal to 2, to green if its greater than or equal to 4, and orange otherwise
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
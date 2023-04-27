import { hero_illustration, bench, tulip, child_boy, child_girl, man_laptop, pin, woman_laptop } from "../assets";
import { Searchbar, HomeCard } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="h-screen flex justify-center items-center gap-9 mx-4">

                <img src={hero_illustration} alt='Hero Illustration' className="max-w-[692px] h-auto 2xl:hidden"/>

                <div className="">
                    <h1 className="text-6xl">Find Your Dream Job <span className="text-purple-700">With Us</span></h1>
                    <h2 className="text-2xl sm:text-xl">Enter an <b>address</b> to get started</h2>

                    <Searchbar/>
                    <h3 className="xsm:text-[15px]">Like what you are seeing? <a href="#join-us" className="bg-purple-700 rounded-tl-[25px] rounded-br-[25px] rounded-[5px] p-4 ml-2 xsm:ml-0 ease-in-out duration-150 hover:bg-purple-600">Join us below!</a></h3>
                </div>

                <img src={bench} alt='A bench' className="absolute bottom-0 right-[354px] w-[236px] h-auto md:right-[184px] md:w-[136px]" />
                <img src={tulip} alt='A tulip plant' className="absolute bottom-0 right-[130px] w-[183px] h-auto md:right-[20px] md:w-[200px]" />
            </section>

            <section id="join-us" className="min-h-screen h-full flex flex-col justify-center align-center px-4 relative lg:px-2 black-gradient">
                <h1 className="text-6xl text-center font-bold absolute top-20 w-full lg:relative lg:top-0 lg:my-5 md:text-4xl">Become Part Of The Family</h1>
                <div className="flex justify-evenly opacity-25 absolute w-full top-[203px] -z-10 lg:hidden">
                    <div className="min-w-[300px] h-[300px] card-gradient rounded-3xl"></div>
                    <div className="min-w-[300px] h-[300px] card-gradient rounded-3xl"></div>
                    <div className="min-w-[300px] h-[300px] card-gradient rounded-3xl"></div>
                </div>

                <div className="flex justify-between px-1 lg:flex-col lg:px-0 lg:gap-3 lg:mx-auto lg:mb-[200px]">
                    <HomeCard title="Manage and edit your ratings" 
                        img={man_laptop} 
                        altTag="A man using a laptop" 
                        position="bottom-[-75px] left-0 lg:bottom-0"
                    />

                    <HomeCard title="Bookmark your favorite employers" 
                        img={pin} 
                        altTag="Bookmark" 
                        position="bottom-[42px] left-1/2 transform -translate-x-1/2 2xl:bottom-[10px]"
                    />

                    <HomeCard title="Like or dislike ratings" 
                        img={woman_laptop} 
                        altTag="A woman using a laptop" 
                        position="bottom-0 right-0"
                    />
                </div>

                <div className="flex justify-center align-bottom w-full absolute bottom-0 gap-52">
                    <Link to='/signup' className="absolute top-[-25px] text-3xl font-bold decoration-purple-400 ease-in-out duration-150 hover:underline hover:text-[1.9rem]">Sign Up Now!</Link>
                    <img src={child_boy} alt='A boy' className="w-[120px] h-auto" />
                    <img src={bench} alt='A bench' className="w-[236px] h-auto absolute bottom-0" />
                    <img src={child_girl} alt='A girl' className="w-[120px] h-auto" />
                </div>
            </section>
        </>
    )
};

export default Home;
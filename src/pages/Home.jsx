import { hero_illustration, bench, tulip } from "../assets";
import { Searchbar } from "../components";

const Home = () => {
    return (
        <section className="h-screen flex justify-center items-center gap-9 mx-4">
            <img src={hero_illustration} alt='Hero Illustration' className="max-w-[692px] h-auto"/>

            <div className="">
                <h1 className="text-6xl">Find Your Dream Job <span className="text-purple-700">With Us</span></h1>
                <h2 className="text-2xl">Enter an <b>address</b> to get started</h2>

                <Searchbar/>
            </div>

            <img src={bench} alt='A bench' className="absolute bottom-0 right-[354px] w-[236px] h-auto" />
            <img src={tulip} alt='A tulip plant' className="absolute bottom-0 right-[130px] w-[183px] h-auto" />
        </section>
    )
};

export default Home;
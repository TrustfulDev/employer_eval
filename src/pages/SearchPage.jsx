import { useLocation } from 'react-router-dom';
import { mcdonalds } from "../assets";
import { SearchCard } from "../components";

const dummyData = [
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
    {
        "employer": "Taco Bell",
        "address": "720 Story Rd",
        "score": 70,
    },
    {
        "employer": "Fire Wings",
        "address": "779 Story Rd #30",
        "score": 70,
    },
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
    {
        "employer": "McDonalds",
        "address": "777 Story Rd",
        "score": 70,
    },
]

const SearchPage = () => {
    const { state } = useLocation();

    return (
        <section className='min-h-screen pt-20 px-10 pb-5 md:px-2'>
            <div className='mb-5'>
                <div className='flex justify-between items-center pr-12 mb-4'>
                    <div>
                        <h1 className='text-6xl mb-3 lg:text-4xl xsm:text-2xl'>{state.value}</h1>

                        <div className='PLACEHOLDER FOR INPUT BOXES flex gap-[1rem]'>
                            <div className='w-[121px] h-[36px] bg-slate-800 rounded-[5px] border-[1px] border-purple-700 xsm:w-[104px]'></div>
                            <div className='w-[121px] h-[36px] bg-slate-800 rounded-[5px] border-[1px] border-purple-700 xsm:w-[104px]'></div>
                            <div className='w-[121px] h-[36px] bg-slate-800 rounded-[5px] border-[1px] border-purple-700 xsm:w-[104px]'></div>
                        </div>
                    </div>

                    <h1 className='text-5xl lg:text-3xl sm:hidden'>- {dummyData.length} Results -</h1>
                </div>

                <form>
                    <input
                        type="search"
                        placeholder="Search employer"
                        className='w-full rounded px-4 py-2.5 bg-white text-gray-900'
                    />

                    <input type='submit' className='hidden' />
                </form>
            </div>

            <div className='flex flex-wrap gap-5 justify-center'>
                { dummyData.map((employer, index) => {
                    return (
                        <SearchCard img={mcdonalds} 
                            alt="image of employer" 
                            employer={employer.employer}
                            address={employer.address}
                            score={employer.score}            
                            key={index}      
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default SearchPage;
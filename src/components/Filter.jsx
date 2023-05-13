import { RxTriangleDown } from 'react-icons/rx';

const Filter = ({options}) => {
    return (
        <div className='relative w-[121px] h-[36px] rounded-[5px] border-[1px] border-purple-700 xsm:w-[104px] flex justify-between items-center cursor-pointer'>
            <RxTriangleDown className='absolute right-1 text-2xl pointer-events-none cursor-pointer'/>

            <select className='appearance-none w-full py-1 px-3 bg-gray-900 text-sm cursor-pointer'>
                {options.map((item, index) => {
                    return (
                        <option className='bg-slate-800' value={item} key={index}>{item}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Filter;
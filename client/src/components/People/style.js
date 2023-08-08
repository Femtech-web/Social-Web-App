import styles from "../style"

const style = {
    container: 'bg-gray-200 mb-[100px] md:mb-0',
    contTwo: 'md:w-[75%] w-full md:ml-[25%] px-4 bg-white pt-8',
    header: 'font-semibold md:text-2xl text-xl',
    profileCont: `${styles.flexStart2} cursor-pointer border-y-[1px] border-gray-200 py-2 h-fit`,
    img: 'w-[100px] h-[100px] object-contain rounded-full',
    text: ' w-fit font-medium',
    imgCont: 'w-[100px] h-[100px] object-contain rounded-full mr-3',
    imgText: `${styles.flexCenter} object-contain rounded-full bg-red-200 text-center w-full h-full font-sans font-bold text-lg`,
    btn: 'text-sm rounded-md px-8 py-1.5 flex justify-center items-center border-[1px] border-red-300 hover:bg-red-300 mt-2',
}

export default style
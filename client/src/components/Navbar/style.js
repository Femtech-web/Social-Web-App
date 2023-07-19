import styles from '../style'

const style = {
    container: `flex items-start md:flex-row flex-col top-0 md:w-[75%] w-full px-5 py-2 h-auto md:left-[25%] left-0 bg-white fixed border-b-slate-300 border-b-[1px] pb-5 z-40`,
    icon: 'absolute right-4 top-4 cursor-pointer',
    input: 'bg-gray-200 outline-none rounded-full py-3 pl-4 pr-8 w-[190px]',
    rightBar: `${styles.flexEvenly}`,
    btn: `${styles.flexCenter} text-white bg-red-600 py-3 px-4 rounded-full hover:bg-red-700 dark outline-none`, 
    profileCont: `${styles.flexEvenly} ml-6 cursor-pointer`,
    imgCont: 'w-[45px] h-[45px] object-contain rounded-full',
    img: 'object-contain rounded-full',
    imgText: 'object-contain rounded-full bg-red-200 text-center w-full h-full flex justify-center items-center font-sans font-bold text-lg',
    text: 'font-semibold max-w-[150px]'
}
export default style;
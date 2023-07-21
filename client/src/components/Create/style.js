import styles from '../style'

const style = {
    container: 'md:w-[75%] md:ml-[25%] ml-2 p-4 relative w-[95%]',
    header: `${styles.flexBtw} border-b-[1px] border-slate-300 pb-4`,
    small: `${styles.flexStart2} text-slate-500`,
    icon: 'absolute right-4 top-4 cursor-pointer',
    searchInput: 'text-white/70 border-[1px] outline-none bg-transparent px-2 py-1 rounded-md border-white/70 placeholder:text-sm',
    input: 'border-[1px] border-red-300 md:w-[40%] w-[90%]  p-4 rounded-lg outline-none mb-3',
    textarea: 'border-[1px] no-scrollbar border-red-300 resize-none md:w-[40%] w-[90%] h-[200px] p-4 rounded-lg outline-none text-sm placeholder:text-base',
    space: 'mt-4 flex flex-col',
    iconWrapper: 'flex items-center cursor-pointer md:w-fit w-full',
    span: 'bg-red-200 rounded-md p-2 text-black/80 mr-2',
    profileCont: `${styles.flexStart2} mt-10 cursor-pointer`,
    img: 'w-[50px] h-[50px] object-contain rounded-full',
    imgText: 'object-contain rounded-full bg-red-200 text-center w-full h-full flex justify-center items-center font-sans font-bold text-lg',
    text: 'font-semibold max-w-[150px]',
    overlay: `${styles.flexCenter} absolute top-0 w-full h-screen bg-black/50 text-white left-0`,
    catContainer: 'bg-black/80 rounded-md max-h-[650px] p-3 md:w-[50%] w-[80%]',
    catHeader: 'text-white/90 text-lg',
    textWhite: 'text-white/70 text-sm pb-3',
    roller: 'max-h-[400px] overflow-auto no-scrollbar',
    itemCont: `${styles.flexBtw}`,
    btn: 'bg-red-600 hover:bg-red-700 py-2 px-6 text-white rounded-md shadow-black dark outline-none', 
    closeBtn: 'absolute right-6 top-6 font-semibold cursor-pointer',
    DoneBtnCont: `${styles.flexCenter} w-full`,
    DoneBtn: 'bg-red-600 px-4 py-2 text-center rounded-md min-w-[150px] hover:bg-red-700'
}
export default style;
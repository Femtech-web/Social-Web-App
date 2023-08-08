import styles from "../style"

const style = {
    container: 'flex bg-gray-200 min-h-screen relative',
    contTwo: 'md:w-[75%] w-full md:ml-[25%] px-4 pt-8 h-full',
    header: `${styles.flexStart2} border-b-[1px] border-slate-300 pb-4`,
    msgCont: 'flex my-3 w-full px-2',
    msg: 'rounded-md px-6 py-3 min-w-[50px] relative',
    msgSpan: 'absolute right-1 bottom-1 text-[8px]',
    profileCont: `${styles.flexEvenly} ml-6 cursor-pointer`,
    status: 'w-[10px] h-[10px] rounded-full mt-1',
    imgCont: 'w-[45px] h-[45px] rounded-full',
    img: 'object-contain rounded-full',
    imgText: 'object-contain rounded-full bg-red-200 text-center w-full h-full flex justify-center items-center font-sans font-bold text-lg',
    text: 'font-semibold max-w-[150px]',
    contThree: 'md:left-[26%] left-0 fixed md:bottom-1 bottom-5 md:px-0 px-2 md:w-[73%] w-full',
    input: 'md:h-[70px] h-[50px] p-4 outline-none bg-gray-200 border-gray-400 border-[1px] w-full md:rounded-md rounded-full',
    sendBtn: 'cursor-pointer absolute right-4 top-[40%] text-red-700',
    bottomBar: 'bg-gray-200 h-[120px] w-full',
    btn: 'fixed bottom-[80px] w-[50px] h-[50px] right-4 rounded-full flex justify-center items-center border-[1px] border-red-300 hover:bg-red-300',
}

export default style
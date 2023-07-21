import styles from '../style'

const style = {
    container: `${ styles.flexBtw} border-b-slate-300 border-b-[1px] pb-5`,
    posts: (notSearch, mobile) => `${!notSearch || mobile ?  'w-full' : 'w-[70%] mr-4'}  bg-white px-2`,
    noPost:`${styles.flexCenter} h-screen`,
    topCont: `${styles.flexBtw} relative top-container `,
    editor: 'absolute px-4 py-2 shadow-sm -bottom-10 right-0 bg-red-200 rounded-md flex',
    editorIcon: (isNotCreator) =>  `${isNotCreator && 'isNotCreator'} cursor-pointer py-1 flex items-center'`,
    middleCont: 'mt-4 text-[0.9rem]',
    header: 'text-sm mb-1 uppercase font-semibold',
    small: 'text-slate-500 -mt-1 block text-[12px]',
    article: 'max-w-[96%] text-black/95',
    seeMore: 'cursor-pointer text-blue-700',
    more: 'cursor-pointer absolute top-2 right-5',
    btns: (mobile) => `${mobile && 'justify-evenly'} flex items-center mt-3 outline-none`,
    btnClick: `${styles.flexCenter} h-[45px] rounded-lg px-10 bg-red-200 hover:bg-red-300`,
    btnSpan: 'text-base  ml-1',
    profileCont: `${styles.flexStart2}`,
    imgCont: 'w-[45px] h-[45px] object-contain rounded-full',
    img: 'object-contain rounded-full',
    imgText: 'object-contain rounded-full bg-red-200 text-center w-full h-full flex justify-center items-center font-sans font-bold text-lg',
    text: 'w-fit text-[1.1rem] font-semibold'
}
export default style;
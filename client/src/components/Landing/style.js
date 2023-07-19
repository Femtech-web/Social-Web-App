import styles from "../style";



 const style = { 
    container: `${styles.flexCenter} relative z-0 max-h-screen w-full text-white`,
    img: 'w-full h-screen absolute top-0 object-cover z-10',
    overlay: 'absolute top-0 bg-black/50 z-30 w-full h-screen',
    heroText: 'line mb-3 text-center tracking-wide md:p-0 p-6',
    header: `text-xl z-40 absolute top-10 font-bold`,
    hero: `${styles.flexCenter} w-full flex-col md:mt-[10%] mt-[25%] h-full`,
    btn: `${styles.flexCenter} px-8 py-4 bg-white text-black  min-w-[200px] rounded-md text-red-800`,
 }

 export default style;
import styles from '../style'

const style = {
  container: (idb) => `${idb ? "flex" : "hidden"} fixed bottom-0 w-full min-h-[80px] bg-white items-center justify-between px-8 py-6`,
  btn: `${styles.flexCenter} w-[50px] h-[50px] text-white bg-red-600 py-3 px-4 rounded-full hover:bg-red-700 dark outline-none`, 
}
export default style;
const style = {
    container: 'flex bg-gray-100 min-h-screen overflow-hidden',
    middleContainer: 'md:w-[75%] w-full md:ml-[25%] pl-2',
    bottomContainer: (mobile) => `w-full flex mt-[90px] ${mobile && 'mb-[90px]'}`,
}

export default style;
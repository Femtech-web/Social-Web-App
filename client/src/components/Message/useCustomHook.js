import { useEffect, useState } from "react";
import { fetchMessages } from "../../Redux/apiCalls";

export const useFetch = (location) => {
    const [dbMessages, setDbMessages ] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const allMessages = await fetchMessages();
            
            setDbMessages(allMessages)
        }
        
        getMessages();
    }, [location.pathname])

    // console.log(dbMessages);
    return [dbMessages];
}
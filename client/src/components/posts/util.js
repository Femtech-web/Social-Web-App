import { useState } from 'react';

export const useCustomStateId = () => {
    const [ currentId, setCurrentId ] = useState('');

    return [ setCurrentId, currentId];
}

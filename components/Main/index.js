import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import UserAvatar from './UserAvatar';

const colorGradients = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500"
]
export default function Main() {
    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colorGradients).pop());
    }, [])
    return (
        <div className='flex-grow relative'>
            <div className='absolute right-2 top-5'>
                <UserAvatar />  
            </div>
            <div className={`bg-gradient-to-b ${color} to-black h-80`}>
                yo
            </div>
        </div>
    )
}
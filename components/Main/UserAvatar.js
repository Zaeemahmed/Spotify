import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline'

export default function UserAvatar() {
    const { data: session, status } = useSession();
    console.log(session)
    return (
        <div className='flex text-white rounded-full space-x-3 items-center bg-black p-2'>
            <img src={session?.user.image} className='w-8 h-8 rounded-full'/>
            <p>{session?.user.name}</p>
            <ChevronDownIcon className='h-5 w-5'/>
        </div>
    )
}
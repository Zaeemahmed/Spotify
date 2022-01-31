import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { shuffle } from 'lodash';
import UserAvatar from './UserAvatar';
import { playListIdState, playlistState } from '../../atoms/playList';
import useSpotify from '../../hooks/useSpotify';

const colorGradients = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500"
]
export default function Main() {
    const [color, setColor] = useState(null);
    const playListId = useRecoilValue(playListIdState);
    const [playList, setPlayList] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(shuffle(colorGradients).pop());
    }, [playListId])

    useEffect(() => {
        playListId && spotifyApi.getPlaylist(playListId).then(data => setPlayList(data.body))
    }, [spotifyApi, playListId])

    return (
        <div className='flex-grow relative'>
            <div className='absolute right-2 top-5'>
                <UserAvatar />  
            </div>
            <div className={`bg-gradient-to-b ${color} to-black h-80 flex items-end`}>
                <img src={playList?.images[0].url} className='h-44 w-44 shadow-2xl'/>
                <div></div>
            </div>
        </div>
    )
}
import { HomeIcon, PlusCircleIcon, HeartIcon, RssIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useRecoilState } from 'recoil';
import { signOut, useSession } from 'next-auth/react';
import SidebarItem from './SidebarItem';
import Playlist from '../Playlist';
import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { playListIdState } from '../../atoms/playList';

export default function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playLists, setPlaylists] = useState([])
    const [playListId, setPlayListId] = useRecoilState(playListIdState);

    useEffect(async () => {
        if(spotifyApi.getAccessToken()) {
            const playlistsData = await spotifyApi.getUserPlaylists();
            setPlaylists(playlistsData.body.items)
        }
    }, [session])

    return (
        <div className='space-y-4 p-5 text-gray-500 h-screen scrollbar-hide overflow-y-scroll'>
            <button 
                className='flex items-center space-x-2 hover:text-white' 
                onClick={() => signOut()}
            >
                Log out
            </button>
            <SidebarItem Icon={HomeIcon} iconText="Home"/>
            <SidebarItem Icon={SearchIcon} iconText="Search"/>
            <SidebarItem Icon={LibraryIcon} iconText="Your Library"/>
            <hr className='border-t-[0.1px] border-gray-900' />
            <SidebarItem Icon={HeartIcon} iconText="Liked songs"/>
            <SidebarItem Icon={PlusCircleIcon} iconText="Create a playlist"/>
            <SidebarItem Icon={RssIcon} iconText="Your episodes"/>
            <hr className='border-t-[0.1px] border-gray-900' />
            {playLists.map(playlist => <Playlist playlistName={playlist.name} key={playlist.id} onClick={() => setPlayListId(playlist.id)}/>)}
        </div>
    )
}
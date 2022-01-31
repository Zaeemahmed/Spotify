import { HomeIcon, PlusCircleIcon, HeartIcon, RssIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from 'recoil';
import { signOut, useSession } from 'next-auth/react';
import SidebarItem from './SidebarItem';
import Playlist from '../Playlist';
import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { playListIdState, playlistState } from '../../atoms/playList';

export default function Sidebar() {
    const spotifyApi = useSpotify();
    const [playlistId, setPlaylistId] = useRecoilState(playListIdState);
    const [playLists, setPlaylists] = useState([]);
    const { data: session } = useSession();
    // const currentPlaylist = useRecoilValue(playlistState);

    useEffect(async () => {
        if(spotifyApi.getAccessToken()) {
            const userPlaylists = await spotifyApi.getUserPlaylists();
            setPlaylists(userPlaylists.body.items);
            console.log(playLists)
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
            {playLists.map(playlist => <Playlist key={playlist.id} playlistName={playlist.name} onClick={() => setPlaylistId(playlist.id)}/>)}
        </div>
    )
}
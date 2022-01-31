export default function Playlist({ playlistName, onClick }) {
    return <p className='cursor-pointer hover:text-white' onClick={onClick}>{playlistName}</p>
}
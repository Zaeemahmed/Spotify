import { atom } from 'recoil';

export const playListIdState = atom({
    key: 'playListIdState',
    default: '',
});

export const playlistState = atom({
    key: 'playlistState',
    default: null,
})
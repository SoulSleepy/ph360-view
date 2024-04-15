import { IPhoto } from 'app/types/types'
import { createSlice } from '@reduxjs/toolkit'

interface IState {
    photos: IPhoto[]
    selectedPhoto: string
}

const initialState: IState = {
    photos: [],
    selectedPhoto: '',
}

export const photo = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setActivePhoto: (state, { payload }) => {
            state.selectedPhoto = payload
        },
        setPhotos: (state, { payload }) => {
            state.photos = [...state.photos, ...payload]
        },
        deletePhoto: (state, { payload }) => {
            state.photos = state.photos.filter(({ id }) => id !== payload)
        },
    },
})

export const { setActivePhoto, setPhotos, deletePhoto } = photo.actions

export default photo.reducer

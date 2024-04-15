'use client'

import { useAppSelector } from 'state/store'
import { DeleteIcon, LogoIcon, UploadIcon } from 'app/icons/Icons'
import { useDispatch } from 'react-redux'
import {
    deletePhoto,
    setActivePhoto,
    setPhotos,
} from 'state/slices/photo.slice'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IPhoto } from '../types/types'
import { getNoun } from '../helpers/helpFunctions'
import { Loader } from './Loader'

export const Home = () => {
    const dispatch = useDispatch()
    const { photos } = useAppSelector((store) => store.photo)
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [lengthFiles, setLengthFiles] = useState(0)

    const selectPhoto = (img: string) => {
        dispatch(setActivePhoto(img))
        push('./PhotoSphereViewer')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        const count = files ? files.length : 0
        setLengthFiles(count)
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const res: IPhoto[] = []
        const files = (
            event.currentTarget.elements.namedItem(
                'metadata'
            ) as HTMLInputElement
        ).files

        if (!files) {
            setIsLoading(false)
            return
        }

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader()
            reader.readAsDataURL(files.item(i) as File)
            reader.onload = function (e) {
                const result = (e.currentTarget as FileReader).result
                if (result) {
                    res.push({
                        id: uuidv4(),
                        img: result as string,
                    })
                    if (res.length === files?.length) {
                        dispatch(setPhotos(res))
                        setIsLoading(false)
                    }
                }
            }
        }
    }

    return (
        <div className='w-[1000px] h-[600px] bg-secondary rounded-xl shadow-dark flex flex-col gap-2'>
            <div className='h-[56px] rounded-t-xl px-2 flex flex-row justify-between items-center bg-primary border-b-[2px] border-tertiary'>
                <div className='flex flex-row items-center'>
                    <div className='scale-[.45] ml-[-25px] pt-[6px]'>
                        <LogoIcon />
                    </div>
                    <p className='text-lg text-textBase tracking-wide ml-[-20px] font-semibold uppercase'>
                        Просмотр изображений
                    </p>
                </div>
                <Loader isLoading={isLoading}>
                    <></>
                </Loader>
                <form
                    onSubmit={onSubmit}
                    className='flex flex-row gap-2 w-[400px] items-center'
                >
                    <div className='w-full relative text-center'>
                        <input
                            name='metadata'
                            type='file'
                            id='input__file'
                            className='opacity-0 hidden absolute'
                            multiple
                            accept='image/jpeg, image/jpg'
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor='input__file'
                            className='w-full max-w-[260px] h-[44px] bg-input text-lg font-bold flex items-center rounded-[3px] cursor-pointer my-0 mx-auto'
                        >
                            <span className='h-[44px] w-[44px] mr-[15px] flex justify-center items-center border-r-[1px] border-primary'>
                                <UploadIcon />
                            </span>
                            <span className='leading-none mt-[1px] text-white'>
                                {lengthFiles === 0
                                    ? 'Выберите файл'
                                    : `${getNoun(
                                          lengthFiles,
                                          'Выбран',
                                          'Выбраны',
                                          'Выбрано'
                                      )}
                                     ${lengthFiles} ${getNoun(
                                          lengthFiles,
                                          'файл',
                                          'файла',
                                          'файлов'
                                      )}`}
                            </span>
                        </label>
                    </div>
                    <button
                        className='h-[44px] bg-input text-lg font-bold flex items-center rounded-[3px] cursor-pointer my-0 mx-auto px-3 text-white'
                        type='submit'
                    >
                        Отправить
                    </button>
                </form>
            </div>
            <div className='flex flex-col p-2 overflow-auto'>
                <div className='grid grid-cols-3 gap-3'>
                    {!!photos.length &&
                        photos.map(({ id, img }) => {
                            return (
                                <div
                                    className='hover:shadow-neon relative'
                                    key={id}
                                >
                                    <img
                                        onClick={() => selectPhoto(img)}
                                        src={img}
                                        alt='photo'
                                    ></img>
                                    <div
                                        className='w-[25px] h-[25px] bg-delete hover:bg-secondary cursor-pointer rounded-sm absolute right-1 top-1'
                                        onClick={() =>
                                            dispatch(deletePhoto(id))
                                        }
                                    >
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

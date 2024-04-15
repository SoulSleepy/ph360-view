import { useAppSelector } from 'state/store'
import { ArrowBackIcon, ArrowNextIcon } from 'app/icons/Icons'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setActivePhoto } from 'state/slices/photo.slice'

export const NavigateMenu = () => {
    const { push } = useRouter()
    const dispatch = useDispatch()
    const { photos, selectedPhoto } = useAppSelector((store) => store.photo)

    const goToPreviousPhoto = () => {
        const index = photos.findIndex(({ img }) => selectedPhoto === img)
        const previousId = index > 0 ? index - 1 : photos.length - 1
        dispatch(setActivePhoto(photos[previousId].img))
    }

    const goToNextPhoto = () => {
        const index = photos.findIndex(({ img }) => selectedPhoto === img)
        const nextId = index < photos.length - 1 ? index + 1 : 0
        dispatch(setActivePhoto(photos[nextId].img))
    }

    const btnStyle = 'h-[35px] w-[35px] rounded-md hover:scale-110 cursor-pointer bg-navigate flex items-center justify-center'

    return (
        <div className='fixed top-1 right-1 h-[50px] w-[140px] bg-delete rounded-md flex flex-row gap-2 items-center justify-center'>
            <div
                className={`rotate-180 ${btnStyle}`}
                onClick={goToPreviousPhoto}
            >
                <ArrowNextIcon />
            </div>
            <div
                className={btnStyle}
                onClick={goToNextPhoto}
            >
                <ArrowNextIcon />
            </div>
            <div
                className={btnStyle}
                onClick={() => push('./')}
            >
                <ArrowBackIcon />
            </div>
        </div>
    )
}

import { ReactNode } from 'react'
import styles from './loader.module.css'
import cn from 'classnames'

interface IProps {
    children: ReactNode
    isLoading: boolean | null
    isError?: boolean
    size?: number
}

export const Loader = ({ children, isLoading, isError, size }: IProps) => {

    if (isLoading) {
        return (
            <div className={styles.wrap}>
                <div
                    className={cn(
                        styles.ellipsis,
                        { 'scale-75': size == 75 },
                        { 'scale-125': size == 125 }
                    )}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
    return <>{children}</>
}

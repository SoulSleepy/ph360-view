import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import bg from './images/bg.png'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: 'Photo360-Viewer',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='ru'>
            <body className={inter.className}>
                <div className='relative flex h-screen justify-center items-center'>
                    <Image
                        className='absolute h-full w-full object-cover'
                        src={bg}
                        alt='background'
                    />
                    <StoreProvider>
                        <div className='absolute'>{children}</div>
                    </StoreProvider>
                </div>
            </body>
        </html>
    )
}

import { useEffect, useState } from 'react'
import { events, Decimal, MDS, commands } from 'npm-upload-9781'
import Header from './layout/Header'
import ContentContainer from './layout/ContentContainer'
import { useStore } from './Store'
import PendingItem from './components/PendingItem'

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore: can assign
    MDS.DEBUG_HOST = '127.0.0.1'
    // @ts-ignore: can assign
    MDS.DEBUG_PORT = 9003
    // @ts-ignore: can assign
    MDS.DEBUG_MINIDAPPID = '0xEF2CD74DE3876C91DE5FD441F8CF5E2133A7EFFB857B4A41DE5F84DE5DEDA3B1'
}

function App() {
    const pending = useStore((state) => state.pending) // initialised to null
    const getPending = useStore((state) => state.getPending)

    // Decimal.js is used to handle floating point numbers
    Decimal.set({ precision: 60 })

    useEffect(() => {
        events.onInit(() => {
            getPending()
        })
    }, [])

    return (
        <>
            <Header></Header>
            <ContentContainer>
                {pending.map((pending, i) => (
                    <PendingItem pending={pending} key={pending.uid}></PendingItem>
                ))}
            </ContentContainer>
        </>
    )
}

export default App

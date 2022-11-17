import create from 'zustand'
import { commands, MaxContact, Maxima } from 'npm-upload-9781'

export interface Pending {
    command: string
    minidapp: {
        conf: {
            name: string
            icon: string
            version: string
            description: string
            permission: string
        }
        uid: string
    }
    uid: string
}

interface StoreState {
    pending: Pending[]
    getPending: () => void
    // toast stuff
    isToastOpen: boolean
    closeToast: () => void
    message: string
    toastType: 'success' | 'error' | 'warning'
    toast: {
        success: (message: string) => void
        error: (message: string) => void
        warning: (message: string) => void
    }
}

export const useStore = create<StoreState>()((set, get) => ({
    pending: [],
    getPending: async () => {
        const action = 'pending'
        const pending = await commands.mds({ action })
        console.log('pending', pending.pending)
        pending.pending.reverse()
        set((state) => ({ pending: pending.pending }))
    },
    // toast stuff
    isToastOpen: false,
    closeToast: () => set(() => ({ isToastOpen: false })),
    message: '',
    toastType: 'success',
    toast: {
        success: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'success',
                message,
            })),
        error: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'error',
                message,
            })),
        warning: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'warning',
                message,
            })),
    },
}))

export const rejectPending = async (uid: string) => {
    const action = 'deny'
    const response = await commands.mds({ action, uid })
    console.log('remove contact response', response)
    useStore.getState().toast.success(response)

    useStore.getState().getPending()
}

export const acceptPending = async (uid: string) => {
    const action = 'accept'
    const response = await commands.mds({ action, uid })
    console.log('remove contact response', response)
    if (response.status) {
        useStore.getState().toast.success(`Pending accepted`)
    } else {
        let message = 'Pending failed'
        if (response.message) {
            message = response.message
        }
        useStore.getState().toast.error(message)
    }

    useStore.getState().getPending()
}

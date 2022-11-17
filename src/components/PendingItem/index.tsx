import { useState } from 'react'
import { Pending } from './../../Store'
import styles from './PendingItem.module.css'
import { useStore, rejectPending, acceptPending } from './../../Store'
import Modal from './../../layout/Modal'

interface IProps {
    pending: Pending
}
function PendingItem({ pending }: IProps) {
    const [openModal, setOpenModal] = useState(false)

    const icon = `/${pending.minidapp.uid}/${pending.minidapp.conf.icon}`

    const onRejectClicked = () => {
        rejectPending(pending.uid)
    }

    const onModalCloseClicked = () => {
        setOpenModal(false)
    }

    const onAgreeClicked = async () => {
        await acceptPending(pending.uid)
        // dont bother closing modal, it should get destroyed when the pending item is deleted
    }

    return (
        <>
            <div className={styles.pendingCard}>
                <div className={styles.header}>
                    <div>
                        <div className={styles.name}>{pending.minidapp.conf.name}</div>
                        <div className={styles.description}>{pending.minidapp.conf.description}</div>
                    </div>

                    <img src={icon} height={40}></img>
                </div>
                <div className={styles.bar}></div>
                <div>This application is trying to perform a write operation</div>

                <div className={styles.pre}>{pending.command}</div>
                <div>Are you sure you want to allow this transaction?</div>
                <div className={styles.buttonContainer}>
                    <button className={styles.success} onClick={() => setOpenModal(true)}>
                        Allow
                    </button>
                    <button className={styles.failure} onClick={onRejectClicked}>
                        Reject
                    </button>
                </div>
            </div>

            <Modal open={openModal}>
                <div className={styles.header}>
                    <div>
                        <div className={styles.name}>{pending.minidapp.conf.name}</div>
                        <div className={styles.description}>{pending.minidapp.conf.description}</div>
                    </div>

                    <img src={icon} height={40}></img>
                </div>
                <div className={styles.bar}></div>

                <div>Are you sure you want to process this transaction?</div>

                <div className={styles.pre}>{pending.command}</div>

                <div className={styles.modalActions}>
                    <button className={styles.success} onClick={onAgreeClicked}>
                        Agree
                    </button>

                    <a onClick={onModalCloseClicked} className={`${styles.pointer} ${styles.underline}`}>
                        Cancel
                    </a>
                </div>
            </Modal>
        </>
    )
}

export default PendingItem

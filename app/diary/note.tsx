'use client';
import styles from '../../styles/Home.module.css'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { entry } from '../../models/entry';

export default function Note(props: entry) {
    const [id, setId] = useState('');

    useEffect(() => {
        setId(props.id);
    }, []);

    const router = useRouter();

    const deleteEntry = async (e: any) => {
        e.preventDefault();
        
        try {
            await fetch('http://127.0.0.1:8090/api/collections/diary/records/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            });
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={deleteEntry} className={styles.paper}>
            <h2>{props.title}</h2>
            <div className={styles.paper_content}>
                <p>{props.text}</p>
            </div>

            <button type="submit" className={styles.delete_entry_button}>
                Delete entry
            </button>
        </form>
    )
}
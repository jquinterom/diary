import { entry } from '../../models/entry';
import styles from '../../styles/Home.module.css'
import NewEntry from './newEntry'
import Note from './note'

async function getEntries() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/diary/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as entry[];
}


export default async function diary() {
    const entries = await getEntries();
    
    return (
        <div className={styles.entries_container}>
            <h1>Entries {entries?.length} </h1>
            <div className={styles.entries_part}>
                {entries?.map((entry) => {
                    return <Note id={entry.id} title={entry.title} text={entry.text}/>;
                })}
                
                <NewEntry></NewEntry>
            </div>

        </div>
    );
}

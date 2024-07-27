/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useEffect, useState } from 'react'
import { Note } from '../common/types';
import { db } from '../appwrite/databases';
import { Spinner } from '../icons';

import styles from './NoteContextProvider.module.scss';

interface NoteProviderProps {
    children: JSX.Element;
}

export const NoteContext = createContext<any>(null);

export const NoteProvider = ({ children }: NoteProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    useEffect(() => {
        init();
    }, []);
  
    const init = async () => {
      const response = await db.notes.list();
      setNotes(response.documents);
      setLoading(false);
    }

    const contextData = { 
        notes, 
        setNotes,
        selectedNote,
        setSelectedNote,
    };

    return (
        <NoteContext.Provider value={contextData}>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <Spinner size='100' />
                </div>
            ) : (
                children
            )}
        </NoteContext.Provider>
    )
}
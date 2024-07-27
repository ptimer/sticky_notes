import { useContext, useRef } from 'react';
import { Plus } from '../../icons';
import styles from './AddButton.module.scss';

import colors from '../../assets/colors.json';
import { db } from '../../appwrite/databases';
import { NoteContext } from '../../context/NoteContext';
import { Note } from '../../common/types';

export const AddButton = () => {
    const { setNotes } = useContext(NoteContext);

    const startingPos = useRef(10);
    
    const handleAddNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };

        startingPos.current += 10;

        const response = await db.notes.create(payload);
        setNotes((prevState: Note[]) => [response, ...prevState]);
    }

    return (
        <div onClick={handleAddNote} className={styles.addButton}>
            <Plus />
        </div>
    );
};
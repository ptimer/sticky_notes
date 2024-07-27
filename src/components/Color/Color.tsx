import { useContext } from 'react';
import { Color as ColorType, Note } from '../../common/types';
import styles from './Color.module.scss';
import { NoteContext } from '../../context/NoteContext';
import { db } from '../../appwrite/databases';

interface Props {
    color: ColorType
}

export const Color = ({ color }: Props) => {
    const { notes, setNotes, selectedNote } = useContext(NoteContext);

    const changeColor = async () => {
        try {
            const currentNoteIndex = (notes as Note[])
            .findIndex(note => note.$id === selectedNote.$id);

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color),
            });
        } catch (err) {
            alert('You must select a note before changing colors');
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className={styles.color}
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};
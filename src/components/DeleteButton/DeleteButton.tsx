import { useContext } from 'react';
import { db } from '../../appwrite/databases';
import { Note } from '../../common/types';
import { Trash } from '../../icons';
import { NoteContext } from '../../context/NoteContext';

interface Props {
    noteId: string;
}

export const DeleteButton = ({ noteId }: Props) => {
    const { setNotes } = useContext(NoteContext);

    const handleDelete = async () => {
        db.notes.delete(noteId);
        setNotes((prevState: Note[]) => prevState.filter(note => note.$id !== noteId));
    }
    
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    )
}
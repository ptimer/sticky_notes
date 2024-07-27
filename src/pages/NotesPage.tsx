import { useContext } from 'react';
import { Controls, NoteCard } from '../components';
import { NoteContext } from '../context/NoteContext';
import { Note } from '../common/types';

function NotesPage() {
    const { notes } = useContext(NoteContext);

    return (
      <div>
        {notes.map((note: Note) => <NoteCard note={note} key={note.$id} />)}
        <Controls />
      </div>
    )
  }
  
  export default NotesPage;
  
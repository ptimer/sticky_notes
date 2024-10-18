import Ribbon from './components/Ribbon';
import { NoteProvider } from './context/NoteContext';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <div id='app'>
      <NoteProvider>
        <>
          <NotesPage />
          <Ribbon
            position="right-bottom"
            title="View Source on GitHub"
            url={"https://github.com/ptimer/sticky_notes"}
            baseColour="dark-gray"
          />
        </>
      </NoteProvider>
    </div>
  )
}

export default App

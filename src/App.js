import React from 'react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "02/14/2022"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "02/10/2022"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "02/12/2022"
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <nav style={styles.navbar}>
        <h1>React Notes App</h1>
        <botton>new botton</botton>
      </nav>

      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
      
      <footer style={styles.footer}>
        <p>© 2025 React Notes App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#6200ea",
    color: "white",
    padding: "15px",
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  },
  footer: {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "10px",
    marginTop: "20px",
    position: "fixed",
    bottom: "0",
    width: "100%",
  },
};

export default App;

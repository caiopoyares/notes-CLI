const chalk = require("chalk");
const fs = require("fs");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (err) {
    return {
      notes: []
    };
  }
};

const saveNotes = notes => {
  if (notes.length === 0) {
    notes = {
      notes: []
    };
  }
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const addNotes = argv => {
  const oldNotes = loadNotes();
  if (oldNotes.notes.filter(note => note.title === argv.title).length > 0) {
    debugger;
    console.log(chalk.bgRed("The note title already exists."));
    return;
  }

  const newNotes = {
    notes: [
      ...oldNotes.notes,
      {
        title: argv.title,
        body: argv.body
      }
    ]
  };

  saveNotes(newNotes);
  console.log(chalk.green("Added successfully!"));
};

const readSingleNote = title => {
  const notes = loadNotes();
  const selectedNote = notes.notes.filter(note => note.title === title);
  console.log(chalk.black.bgGreen(selectedNote[0].body));
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.notes.length < 1) {
    console.log(chalk.bgRed("No notes were found."));
    return;
  }
  notes.notes.map((note, index) => {
    console.log(`Nota ${index} -> ${note.title}`);
  });
};

const removeNote = title => {
  const oldNotes = loadNotes();
  const notes = oldNotes.notes.filter(note => note.title !== title);

  if (notes.length === oldNotes.length) {
    console.log(chalk.bgRed("The note was not found."));
    return;
  }
  const newNotes = {
    notes
  };
  saveNotes(newNotes);
  console.log(chalk.green("The note was removed."));
};

module.exports = {
  addNotes,
  removeNote,
  readSingleNote,
  listNotes
};

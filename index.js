const chalk = require("chalk");
const fs = require("fs");
const yargs = require("yargs");

const loadNotes = () => {
  const dataBuffer = fs.readFileSync("notes.json");
  return JSON.parse(dataBuffer.toString());
};

yargs.command(
  "add",
  chalk.black.bgYellowBright("Add new note"),
  yargs => {
    return yargs
      .option("title", {
        alias: "t",
        describe: "The note's title",
        demand: true,
        type: "string"
      })
      .option("body", {
        alias: "b",
        describe: "The note's body",
        demand: true,
        type: "string"
      });
  },
  argv => {
    const oldNotes = loadNotes();

    const newNotes = {
      notes: [
        ...oldNotes.notes,
        {
          title: argv.title,
          body: argv.body
        }
      ]
    };

    fs.writeFileSync("notes.json", JSON.stringify(newNotes));

    console.log(chalk.green("Success!"));
  }
).argv;

yargs.command("list", "List all notes", {}, () => {
  const notes = loadNotes();
  notes.notes.map((note, index) => {
    console.log(`Nota ${index} -> ${note.title}`);
  });
}).argv;

yargs.command(
  "read",
  "Read a single note",
  {
    title: {
      alias: "t",
      describe: "The note's title",
      demand: true,
      type: "string"
    }
  },
  ({ title }) => {
    const notes = loadNotes();
    const selectedNote = notes.notes.filter(note => note.title === title);
    console.log(chalk.black.bgGreen(selectedNote[0].body));
  }
).argv;

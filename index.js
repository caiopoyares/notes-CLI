const chalk = require("chalk");
const yargs = require("yargs");
const notesFunc = require("./notes");

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
    notesFunc.addNotes(argv);
  }
).argv;

yargs.command("list", "List all notes", {}, () => {
  notesFunc.listNotes();
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
    notesFunc.readSingleNote(title);
  }
).argv;

yargs.command(
  "remove",
  "Remove note",
  {
    title: {
      alias: "t",
      describe: "Note's title",
      demand: true,
      type: "string"
    }
  },
  ({ title }) => {
    notesFunc.removeNote(title);
  }
).argv;

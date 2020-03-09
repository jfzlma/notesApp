const yargs = require('yargs');
const notes = require('./notes.js')

yargs.command({                                             //add note command
    command: 'add',
    describe: 'Add New Note',
    builder: {
        title : {
            describe: 'title of note to be added',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body of note to be added',
            demandOption: true,
            type : 'string'
        }    
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({                                     //remove note command
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: 'title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);

    }
})


yargs.command({
    command: 'list',
    describe: 'List all notes present',
    handler: function(argv) {
        notes.listNotes();
    }
})  

yargs.command({
    command: 'read',
    describe: 'read a note with given title',
    builder: {
        title: {
            describe : 'title of note to be read',
            demandOption: true,
            type : 'string'
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title);

    }

})

yargs.parse();
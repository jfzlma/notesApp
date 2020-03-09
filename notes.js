const fs = require('fs')
const chalk = require('chalk')
const addNote = function(title, body) {                                 //adds new note
    const notes = loadNotes();
    const duplicates = notes.filter(function (note) {                   //checking duplicate title
        return note.title == title;    
    });
    if(duplicates.length == 0) {
        notes.push( {
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log("\nNew Note Added Sucesfully!!!\n");
    }
    else{
        console.log("\na note with same title already exists!!!\n");
    }
}



const saveNotes = function(notes) {  
                                           //saving note to notes.json
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}



const loadNotes = function() {    
                                              //retriving all notes present
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e) {
        return []
    }
}


const removeNote = function(title) {

    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note) {
        return note.title != title

    })

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed'));
        saveNotes(notesToKeep);
    }

    else {
        console.log(chalk.red.inverse('No Note found with given title'));
    }
}


const listNotes = function() {

    const notes = loadNotes();

    console.log(chalk.green.inverse(" Notes"));
    notes.forEach(note => {
        console.log("Title : "+ chalk.red(note.title) + ", Body: " + chalk.red(note.body));
        
    });

}

const readNote = function(title) {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note) {
        console.log(chalk.green(note.title)) + " , " + console.log(chalk.blue(note.body));
    }
    else{
        console.log(chalk.red.inverse("Note With title " + title + 'Not Found' ));
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}
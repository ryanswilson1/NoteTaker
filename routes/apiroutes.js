const noteInfo = require("../db/db.js");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteInfo);
    });


    app.post("/api/notes", function (req, res) {

        let newNote = req.body;

        let lastId = noteInfo[noteInfo.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;

        noteInfo.push(newNote);


        writeFileAsync("./db/db.json", JSON.stringify(noteInfo)).then(function () {
            console.log("noteInfo.json has been updated!");
        });

        res.json(newNote);
    });


    app.delete("/api/notes/:id", function (req, res) {

        const deletedNote = parseInt(req.params.id);


        for (let i = 0; i < noteInfo.length; i++) {

            if (deletedNote === noteInfo[i].id) {

                noteInfo.splice(i, 1);

                const noteJSON = JSON.stringify(noteInfo, null, 2);

                writeFileAsync("./db/db.json", noteJSON).then(function () {
                    console.log("Note has been deleted!");
                });
            }
        }
        res.json(noteInfo);
    });
}
var fs = require('fs');

module.exports = {
    "write": function(examen, handler){
        fs.writeFile('examen.json', JSON.stringify(examen) , handler);
    },
    "read": function(handler){
        fs.readFile('examen.json', handler);
    }
}
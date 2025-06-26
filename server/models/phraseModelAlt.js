const mongoose = require('mongoose')
const { ObjectId } = require("mongodb");

const phraseSchema = new mongoose.Schema(
    {
       
        phraseWord: {
            type: String,
            required: true,
        },
        phrasePhrase: {
            type: String,                     
        },
        phraseLevel: {
            type: String,
        },
        phraseSource: {
            type: String,
        },
      
        processTime: {type: Date}

    }
)


const worterPhrase = mongoose.model('phrases', phraseSchema);

module.exports = worterPhrase;
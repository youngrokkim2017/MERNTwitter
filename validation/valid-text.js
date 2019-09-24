import { StringDecoder } from "string_decoder"

const validText = str => {
    return typeof str === 'string' && str.trim().length > 0; // checks it is a str and also checks that it is a string that contains more than just spaces
}

module.exports = validText;
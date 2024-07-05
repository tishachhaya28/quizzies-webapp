const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactInfoSchema = new Schema({
    contactTitle : {
        type : String
    },
    contactDescription : {
        type : String
    }
})

const ContactInfo = mongoose.model('contact-info', contactInfoSchema);
module.exports = ContactInfo;
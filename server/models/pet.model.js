const mongoose = require('mongoose');  
const PetSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Pet Name is required"],
        minlength: [3, "Pet Name must be at least 3 characters"] 
    },
    type: { 
        type:String,
        required: [true, "Pet Type is required"],
        minlength: [3, "Pet Type must be at least 3 characters"] 
     },
    description: {
        type: String,
        required: [true, "Pet Description is required"],
        minlength: [3, "Pet Description must be at least 3 characters"]
    },
    skill1: { type:String },
    skill2: { type:String },
    skill3: { type:String },
    image: { type:String },
     
}, { timestamps: true });
const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;



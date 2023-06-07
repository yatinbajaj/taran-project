
const  Pet  = require("../models/pet.model");

module.exports.createPet = (req, res) => {
    const { name, type, description, skill1, skill2, skill3, image } = req.body;
    Pet.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
        image
    }) 
        .then(pet => res.json(pet))
        .catch(err => res.json(err));
}

module.exports.getAllPets = (req, res) => {
    Pet.find({})
        .then(pets => res.json(pets))
        .catch(err => res.json(err))
}

module.exports.getPet = (req, res) => {
    Pet.findOne({_id:req.params.id})
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedPet => res.json(updatedPet))
        .catch(err => res.json(err))
}

module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

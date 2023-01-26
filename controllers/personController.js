const router = require('express').Router()

// Model
const Person = require('../model/Person')

// CREATE
router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    const person = {
        name, salary, approved
    }

    try {
        await Person.create(person)
        res.status(201).json({message: "Successfully created a new person!"})

    } catch(error) {
        res.status(500).json({error: error})
    }
})

// READ ALL
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

// READ UNIQUE
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const person = await Person.findOne({_id: id})
        res.status(200).json(person)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

// UPDATE
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const {name, salary, approved} = req.body

    const person = {
            name, salary, approved
        }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        res.status(200).json(updatedPerson)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

// DELETE
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'Sucessfully deleted person!'})

    } catch(error) {
        res.status(500).json({error: error})
    }
})

module.exports = router
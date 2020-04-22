// Modelos
const { Candidate } = require('../models/Candidate');

// Toolkit
const express = require('express');
const router = express.Router();

// Get candidate by user id
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        
        const candidate = await Candidate.findOne({ user: id });

        if(!candidate) {
            return res.status(404).send()
        }

        res.send(candidate);

    } catch (err) {
        res.status(400).send();
    }

})

module.exports = router;
const express = require('express'); 
const router = express.Router(); 

router.use(express.json());

const db = require('./data/helpers/actionModel'); 

router.get('/', (req, res) => {
    db.get() 
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        res.status(500).json({ 
            message: "The actions information could not be retrieved.", 
            error: err
        })
    })
});

router.get('/:id', validateId, validateAction, (req, res) => {
    const { id } = req.params; 

    db.get(id) 
        .then(post => {
            res.status(200).json(post)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The post with this id could not be retrieved.",
                error: err
            })
        })
});

router.post('/', validateAction, (req, res) => {
    const newAction = req.body;

    db.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the action to the database", 
                error: err
            })
        })
});

router.put('/:id', validateId, validateAction, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    const editAction = req.body 

    db.update(id, editAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "The action information could not be modified.",
                error: err
            })
        })
});

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    
    db.remove(id) 
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message: "The actions could not be removed",
                error: err
            })
        })
});

// custom middleware

function validateId(req, res, next) {
    const { id } = req.params; 

    if (id) {   
        req.id = req.params.id
    } else {
        res.status(400).json({
            message: "Invalid Id.",
        })
    }

    next(); 
};

function validateActionId(req, res, next) {
    const { post_id } = req.body; 

    if (id) {   
        req.id = req.body.post_id
    } else {
        res.status(400).json({
            message: "Invalid Id.",
        })
    }

    next(); 
};

function validateAction(req, res, next) {
    const action = req.body; 

    if (action && action.description && action.notes) {
        req.user = req.body; 
    } else if (action && action.description) {
        res.status(400).json({ 
            error: "Missing required notes.",
        })
    } else if (action && action.notes) {
        res.status(400).json({ 
            error: "Missing required description.",
        })
    }

    next()
};

module.exports = router; 


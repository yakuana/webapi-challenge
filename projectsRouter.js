const express = require('express'); 
const router = express.Router(); 

router.use(express.json());

const db = require('./data/helpers/projectModel.js'); 

router.get('/', (req, res) => {
    db.get() 
    .then(projects => {
        res.status(201).json(projects);
    })
    .catch(err => {
        res.status(500).json({ 
            message: "The projects information could not be retrieved.", 
            error: err
        })
    })
});

router.get('/:id', validateId, validateProject, (req, res) => {
    const { id } = req.params; 

    db.get(id) 
        .then(project => {
            res.status(200).json(project)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The post with this id could not be retrieved.",
                error: err
            })
        })
});

router.post('/', validateProject, (req, res) => {
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

router.put('/:id', validateId, validateProject, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    const editProject = req.body 

    db.update(id, editProject)
        .then(project => {
            res.status(200).json(project)
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
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
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

function validateProject(req, res, next) {
    const project = req.body; 

    if (project && project.name && project.description) {
        req.user = req.body; 
    } else if (project && project.name) {
        res.status(400).json({ 
            error: "Missing required description.",
        })
    } else if (action && action.description) {
        res.status(400).json({ 
            error: "Missing required name.",
        })
    }

    next()
};


module.exports = router; 
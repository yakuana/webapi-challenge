const express = require('express');
const server = express();

const actionsRouter = require('./actionsRouter.js'); 
const projectsRouter = require('./projectsRouter.js'); 

server.use(express.json());

server.use(logger)

server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`<h2> Web API Sprint </h2>`)
}); 



//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} from ${req.url}`
  ); 

  next(); 
};



module.exports = server;

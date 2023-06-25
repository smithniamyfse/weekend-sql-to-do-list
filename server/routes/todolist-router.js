const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET all tasks from the 'weekend_to_do_app' database
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "todolist";';
  
    pool.query(queryText)
      .then((result) => {
        console.log('result is:', result);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error making query:', error);
        res.sendStatus(500);
      });
  });
  



// POST a new task to the 'weekend_to_do_app' database
router.post('/', (req, res) => {
    // Create a constant that is an object that stores information in key-value pairs,
        // and subsequently sends it to the Express server
    const newTask = req.body;
    console.log('Adding a new task', newTask);
    // SLQ query to insert a new item into the todolist table
        // use parameterization to eliminate SQL injection
    const queryText = `
      INSERT INTO "todolist" ("task_is_complete", "task")
      VALUES ($1, $2);
    `;
    
    // Set the initial task completion status to false
    const taskParams = [
      false, 
      newTask.task,
    ];

    // Use pool as the communication line to handle the query
    pool.query(queryText, taskParams)
        // Get the result of query
      .then((result) => {
        console.log('New task added', result);
        // Send a status code of 201 (Created) to indicate the client-side request
        // was successful and created the new task
        res.sendStatus(201);
      })
      // Catch any errors that occur
      .catch((error) => {
        console.log('Error making database query: ', error);
        res.sendStatus(500);
      });
  }); // end router.post 
  



// GET specific task by ID
// id is a route parameter
// we use this parameter to identify
// that we want this specific identified part of the request
router.get('/:id', (req, res) => {
  // assign req.params.id to a variable
  // write a SQL query that gets back the task with the
  // specified (parameter) id
  const idToGet = req.params.id;

  const query = 'SELECT * FROM "todolist" WHERE id = $1;';
  // use pool.query to access pool
  // (group of connections between server and database)
  pool
    .query(query, [idToGet])
    // .then because query is asynchronous
    .then((result) => {
      console.log(`Task with id of ${idToGet}:`, result.rows);
      // result.rows is where the desired part of the
      // result/response is
      // send data back to client
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
}); // end router.get by specific id


// ??? Attempted to add a checkbox to check if the task is high priority
  // ??? Thought was to create categories for the user to
  // ??? sort and visually prioritize the tasks
    // ??? After research and experimentation, I couldn't figure it out 😅😵‍💫
/*
// // PUT todolist task_is_high_priority value to 'TRUE' for a specific ID
// router.put('/priority/:id', (req, res) => {
//     const idToUpdate = req.params.id;
//     const query = `UPDATE "todolist" SET "task_is_high_priority" = 'TRUE' WHERE "id" = $1;`;
  
//     pool.query(query, [idToUpdate])
//       .then((result) => {
//         console.log('Task is now high priority', result);
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.log('Error changing task to high priority: ', error);
//         res.sendStatus(500);
//       });
//   }); // end router.put set task to high priority TRUE
*/

// PUT todolist task_is_complete value to 'TRUE' for a specific ID
router.put('/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const query = `UPDATE "todolist" SET "task_is_complete" = 'TRUE' WHERE "id" = $1;`;
  
    pool.query(query, [idToUpdate])
      .then((result) => {
        console.log('Task is now complete', result);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error changing task to complete: ', error);
        res.sendStatus(500);
      });
  }); // end router.put set task to complete TRUE

  

// DELETE a task by ID
router.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;
  // Use query parameterization to protect the
  // database from SQL injection
  const query = `DELETE FROM "todolist" WHERE "id" = $1`;

  // Connect and talk with the database to run the query
  pool.query(query, [idToDelete])
    .then((result) => {
      console.log('Task is deleted', result);
      // Send status 200 or 'ok' to the client
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error making database query: ', error);
      // Send status code 500 or 'internal server error'
      res.sendStatus(500);
    });
}); // end router.delete to delete a task

module.exports = router;

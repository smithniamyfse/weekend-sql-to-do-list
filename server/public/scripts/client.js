console.log('client.js initialized');
// Use jQuery to manipulate the DOM
$(document).ready(onReady);

// function onReady is a callback function
// it is a function that is handed to
// some other function to be executed later on.
function onReady() {
  console.log('jQuery is initialized');
  // call getCurrentToDoList to get the task list on initial page load
  getCurrentToDoList();

  // Event Listener and register an event handler for high-priority checkbox
  $('#checkbox-high-priority').on('click', updateToHighPriority);

  // Event Listener and register an event handler for adding a task button
  $('#add-task-button').on('click', addTask);

  // Event Listener and register an event handler for completion status button
  $('#complete-task-button').on('click', completeTask);

  // Event listener and register an event handler for deleting a task button
  $('#delete-task-button').on('click', deleteTask);
}

// TODO: $.ajax Functions

// ** function getCurrentToDoList returns the list of tasks at the
// beginning of page rendering and refreshes the task list to reflect any changes
// * GET METHOD retrieves a resource
function getCurrentToDoList() {
  console.log('in getCurrentToDoList');
  // ajax call to server to get the task list
  $.ajax({
    type: 'GET',
    url: '/todolist',
  }).then((response) => {
    console.log('GET /todolist response:', response);
    // Pass the response data to the render function
    render(response);
  });
} // end getCurrentToDoList

// ** function addTask adds a task to the task list
// and refreshes the task list to include the new task
// * POST METHOD creates a new resource
function addTask() {
  console.log('in addTask');
  // Collect user input and put values in an object
  let newTask = {
    task_is_high_priority: $('#checkbox-high-priority').val(),
    task: $('#task-in').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/todolist',
    data: newTask,
  })
    .then(function (response) {
      console.log('Response from server: ', response);
      $('#checkbox-high-priority').val(''), $('#task-in').val('');
      getCurrentToDoList();
    })
    .catch(function (error) {
      console.log('Error in POST - adding a task to the list', error);
      alert('Unable to add a new task at this time. Please try again later.');
    });
} // end addTask


// ** function updateToHighPriority changes the task to high priority
    // * PUT METHOD updates an existing resource
  function updateToHighPriority() {
    console.log('in updateToHighPriority');
    console.log('The check-marked task is: ', $(this));
    const taskId = $(this).parent().parent().data("id");
    console.log('taskId of check-marked task is: ', taskId);
  
    $.ajax({
      method: 'PUT',
      url: `/todolist/${taskId}`,
    })
      .then((response) => {
        console.log('Task is checked as high priority! Response: ', response);
        getCurrentToDoList();
      })
      .catch((error) => {
        console.log('Error in check-marking high priority', error);
        alert('Task has NOT been updated to high priority.');
        res.sendStatus(500);
      });
  } // end updateToHighPriority



// ** function completeTask updates the task to completed
// * PUT METHOD updates an existing resource
  function completeTask() {
    console.log('in completeTask');
    console.log('The completed task is: ', $(this));
    const taskId = $(this).parent().parent().data("id");
    console.log('taskId of completed task is: ', taskId);
  
    $.ajax({
      method: 'PUT',
      url: `/todolist/${taskId}`,
    })
      .then((response) => {
        console.log('Task has been completed! Response: ', response);
        getCurrentToDoList();
      })
      .catch((error) => {
        console.log('Error in changing task to completed', error);
        alert('Task has NOT been changed to completed.');
        res.sendStatus(500);
      });
  } // end completeTask


// ** function deleteTask deletes a task with a given id from the task list
// and refreshes the task list to show the task has been removed
// * DELETE METHOD deletes a resource
function deleteTask() {
  // Log the specific id of the task to delete
  console.log('in deleteTask: ', $(this));

  // Use DOM traversal to get the data id of the koalas table row
  const taskId = $(this).parent().parent().data('id');

  // Send a delete request to the server
  $.ajax({
    method: 'DELETE',
    url: `/todolist/${taskId}`,
  })
    .then((response) => {
      console.log('Deleted the task from the list', response);
      getCurrentToDoList();
    })
    .catch((error) => {
      console.log('Error in DELETE - deleting the task from the list', error);
      // Notifies the user with an alert window
      alert('Error with deleting this task from the list.');
    });
}

// ** function render takes the raw data and converts it into something visible to users
// for this web-app it involves HTML and DOM manipulation
function render(tasks) {
  $('#view-to-do-list').empty();
  // loop through the tasks
  for (let i = 0; i < tasks.length; i++) {
    //   if (`${tasks[i].ready_to_transfer}` == "N") {
    $('#view-to-do-list').append(`
      <tr data-id=${tasks[i].id}>
      <td>${tasks[i].task_is_high_priority}</td>
      <td>${tasks[i].task_is_complete}</td>
      <td>${tasks[i].task}</td>
      <td><button id='delete-task-button'>Delete</button></td>
  </tr>
      `);
    //       } else {
    //         $("#viewKoalas").append(`
    //     <tr data-id=${koalas[i].id}>
    //     <td>${koalas[i].name}</td>
    //     <td>${koalas[i].age}</td>
    //     <td>${koalas[i].gender}</td>
    //     <td>${koalas[i].ready_to_transfer}</td>
    //     <td>${koalas[i].notes}</td>
    //     <td>Ready to Transfer! :)</td>
    //     <td><button class='delete-button'>Delete</button></td>
    //   </tr>
    //     `);
  }
}

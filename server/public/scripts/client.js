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

  // ??? Attempted to add a checkbox to check if the task is high priority
  // ??? Thought was to create categories for the user to
  // ??? sort and visually prioritize the tasks
  // ??? After research and experimentation, I couldn't figure it out 😅😵‍💫
  /*
//   // Event Listener and register an event handler for high-priority checkbox
//   $('input[name=high-priority]').change(setToHighPriority);
// //   $('input[name=high-priority]').change(function () {
// //     if ($(this).is(':checked')) {
// //       console.log('Checkbox is checked.');
// //     } else {
// //       console.log('Checkbox is not checked.');
// //     }
// //   });
*/

  // Event Listener and register an event handler for completion status button
  $('#view-to-do-list').on('click', '.complete-task-button', completeTask);

  // Event listener and register an event handler for deleting a task button
  $('#view-to-do-list').on('click', '.delete-task-button', deleteTask);

  // Event Listener and register an event handler for adding a task button
  $('#add-task-button').on('click', addTask);

  }

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
function addTask(event) {
  event.preventDefault();
  console.log('in addTask');
  // Collect user input and put values in an object
  let newTask = {
    task: $('#task-in').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/todolist',
    data: newTask,
  })
    .then(function (response) {
      console.log('Response from server: ', response);
      $('#task-in').val('');
      getCurrentToDoList();
    })
    .catch(function (error) {
      console.log('Error in POST - adding a task to the list', error);
      alert('Unable to add a new task at this time. Please try again later.');
    });
} // end addTask

// ??? Attempted to add a checkbox to check if the task is high priority
// ??? Thought was to create categories for the user to
// ??? sort and visually prioritize the tasks
// ??? After research and experimentation, I couldn't figure it out 😅😵‍💫
/*
// // ** function updateToHighPriority changes the task to high priority
// // * PUT METHOD updates an existing resource
// function setToHighPriority(event) {
//   event.preventDefault();
//   console.log('in setToHighPriority');
//   console.log('The check-marked task is: ', $(this));
//   let idToHighPriority = $(this).parent().parent().data('id');
//   console.log('taskId of check-marked task is: ', idToHighPriority);

//   $.ajax({
//       method: 'PUT',
//       url: `/todolist/priority/${idToHighPriority}`,
//       data: { task_is_high_priority: $(this).prop('checked') }
//   })
//       .then((response) => {
//         render(response);
//           console.log('Task is checked as high priority! Response: ', response);
//           getCurrentToDoList();
//       })
//       .catch((error) => {
//           console.log('Error in check-marking high priority', error);
//           alert('Task has NOT been updated to high priority.');
//           res.sendStatus(500);
//       });
// } // end setToHighPriority
*/

// ** function completeTask updates the task to completed
// * PUT METHOD updates an existing resource
function completeTask() {
  console.log('in completeTask');
  let taskId = $(this).parent().parent().data('id');
  console.log('taskId to complete is: ', taskId);

  $.ajax({
    method: 'PUT',
    url: `/todolist/${taskId}`,
    data: { task_is_complete: false },
  })
    .then((response) => {
      console.log('Task is completed! Response: ', response);
      // Refresh the task list after marking as complete
      render(response);
      getCurrentToDoList();
    })
    .catch((error) => {
      console.log('Error in completing task', error);
      alert('Task has NOT been completed.');
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
    let isComplete = tasks[i].task_is_complete;
    let showStatus = '';
    let buttonComplete = $("#myBtn").addClass('myclass');
    
    if (!isComplete) {
      showStatus = 'Incomplete';
    $('#view-to-do-list').append(`
      <tr data-id=${tasks[i].id}>
      <td><button type="button" id="completed-task-button" class="complete-task-button">${showStatus}</button></td>
        <td>${tasks[i].task}</td>
        <td><button class="delete-task-button">Delete</button></td>
      </tr>
    `);
    } else if (isComplete) {
      showStatus = 'Completed';
      $('#view-to-do-list').append(`
      <tr data-id=${tasks[i].id}>
        <td><button type="button" id="completed-task-button" class="show-complete-button">${showStatus}</button></td>
        <td>${tasks[i].task}</td>
        <td><button class="delete-task-button">Delete</button></td>
      </tr>
    `);
  }
} // end for loop
} // end render


// ??? Attempted to add a checkbox to check if the task is high priority
// ??? Thought was to create categories for the user to
// ??? sort and visually prioritize the tasks
// ??? After research and experimentation, I couldn't figure it out 😅😵‍💫
/*
// // ** function render takes the raw data and converts it into something visible to users
// // for this web-app it involves HTML and DOM manipulation
// function render(tasks) {
//   $('#view-to-do-list').empty();
//   // loop through the tasks
//   for (let i = 0; i < tasks.length; i++) {
//     let isHighPriority = tasks[i].task_is_high_priority;
//     let isComplete = tasks[i].task_is_complete;
//     let showStatus = '';
//     if (isHighPriority && !isComplete) {
//         showStatus = 'Incomplete';
//       $('#view-to-do-list').append(`
//         <tr data-id=${tasks[i].id}>
//         <td>${isHighPriority}</td>
//         <td><button id='complete-task-button'>${showStatus}</button></td>
//         <td>${tasks[i].task}</td>
//         <td><button class='delete-task-button'>Delete</button></td>
//         </tr>
//         `);
//     } else if (isHighPriority && isComplete) {
//         showStatus = 'Complete';
//       $('#view-to-do-list').append(`
//         <tr data-id=${tasks[i].id}>
//             <td></td>
//             <td><button id='complete-task-button'>${showStatus}</button></td>
//             <td>${tasks[i].task}</td>
//             <td><button class='delete-task-button'>Delete</button></td>
//         </tr>
//         `);
//     } else if (!isHighPriority && !isComplete) {
//         showStatus = 'Incomplete';
//       $('#view-to-do-list').append(`
//         <tr data-id=${tasks[i].id}>
//             <td></td>
//             <td><button id='complete-task-button'>${showStatus}</button></td>
//             <td>${tasks[i].task}</td>
//             <td><button class='delete-task-button'>Delete</button></td>
//         </tr>
//         `);
//     } else if (!isHighPriority && isComplete) {
//         showStatus = 'Complete';
//       $('#view-to-do-list').append(`
//         <tr data-id=${tasks[i].id}>
//             <td></td>
//             <td><button id='complete-task-button'>${showStatus}</button></td>
//             <td>${tasks[i].task}</td>
//             <td><button class='delete-task-button'>Delete</button></td>
//         </tr>
//         `);
//     } else if (isHighPriority) {
//         showStatus = 'Incomplete';
//       $('#view-to-do-list').append(`
//         <tr data-id=${tasks[i].id}>
//         <td>${isHighPriority}</td>
//         <td><button id='complete-task-button'>${showStatus}</button></td>
//         <td>${tasks[i].task}</td>
//         <td><button class='delete-task-button'>Delete</button></td>
//         </tr>
//         `);
//     } else {
//         showStatus = 'Incomplete';
//         $('#view-to-do-list').append(`
//           <tr data-id=${tasks[i].id}>
//           <td>${isHighPriority}</td>
//           <td><button id='complete-task-button'>${showStatus}</button></td>
//           <td>${tasks[i].task}</td>
//           <td><button class='delete-task-button'>Delete</button></td>
//           </tr>
//           `);
//     }

//   } // end for loop
// } // end render 
*/
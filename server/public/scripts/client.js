console.log('client.js initialized');
// Use jQuery to manipulate the DOM
$(document).ready(onReady);

// function onReady is a callback function
    // it is a function that is handed to 
    // some other function to be executed later on.
function onReady() {
    console.log('jQuery is initialized');
    // TODO: create getCurrentToDoList function 
        // getCurrentToDoList();

    // Event Listener and register an event handler for adding a task button
    // $('#add-task-button').on('click', addTask);

    // Event Listener and register an event handler for high-priority checkbox
    // $('#checkbox-high-priority').on('click', updateToHighPriority);

    // Event listener and register an event handler for deleting a task button
    // $('#delete-task-button').on('click', deleteTask);
}
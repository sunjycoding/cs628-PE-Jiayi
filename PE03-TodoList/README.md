# Input
The program starts with an empty list of tasks. The user interacts with the program by entering a task description in a text box and clicking the "Add Task" button.

# Process
When the user enters a task description and clicks "Add Task," the task is added to the list. The program uses React's useState to manage the list of tasks and the input from the text box. Each task can be deleted by clicking a "Delete" button next to it, which updates the task list dynamically.

# Output
The program displays the list of tasks as a series of items, each showing the task description with a "Delete" button next to it. If there are no tasks, the list is empty. Clicking the "Delete" button removes the task from the list, immediately updating the display. This output provides a simple and interactive way to manage a list of tasks.
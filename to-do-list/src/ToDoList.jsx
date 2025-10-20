import ToDoItem from "./ToDoItem.jsx";

function ToDoList({ tasks, checked, deleteTask, toggleCompletion }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <ToDoItem
                    key={index}
                    task={task}
                    isChecked={checked[index]}
                    onDelete={() => deleteTask(index)}
                    onToggle={() => toggleCompletion(index)}
                />
            ))}
        </ul>
    );
}

export default ToDoList;

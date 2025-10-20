import { useState } from "react";

function ToDoForm({ addTask }) {
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    };

    function handleAdd(){
        addTask(newTask);
        setNewTask("");
    };

    return (
        <div className="box">
            <input
                type="text"
                placeholder="Add a Task"
                value={newTask}
                onChange={handleInputChange}
            />
            <button className="add-btn" onClick={handleAdd}>
                Add
            </button>
        </div>
    );
}

export default ToDoForm;


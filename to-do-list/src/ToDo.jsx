import { useState } from "react";

function ToDo() {

    const [tasks, setTasks] = useState(["Brush teeth", "Bathe"]);
    const [newTask, setNewTask] = useState("");
    const [checked, setChecked] = useState([false, false]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() === "") return;
        setTasks(t => [...t, newTask]);
        setChecked(c => [...c, false]);
        setNewTask("");
    }

    function delteTask(index) {
        setTasks(t => t.filter((_, i) => i !== index));
        setChecked(c => c.filter((_, i) => i !== index));
    }

  function toggleCompletion(index) {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];

        const combined = tasks.map((task, i) => ({task,checked: newChecked[i],
        }));

        const reordered = [...combined.filter(combi => !combi.checked),
                           ...combined.filter(combi => combi.checked),
        ];

        const updatedTasks = reordered.map(combi => combi.task);
        const updatedChecked = reordered.map(combi => combi.checked);

        setTasks(updatedTasks);
        setChecked(updatedChecked);
    }

    return (
        <>
            <div className="to-do-list">
                <h1>To-do List</h1>
                <div className="box">

                    <input
                        type="text"
                        placeholder="Add a Task"
                        value={newTask}
                        onChange={handleInputChange} />
                    <button
                        className="add-btn"
                        onClick={addTask}>
                        Add
                    </button>
                </div>
                <ul>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <span className="task">{task}</span>
                            <button className="del-btn"
                                onClick={() => delteTask(index)}>
                                Delete
                            </button>
                            <button
                                className="toggle-btn"
                                onClick={() => toggleCompletion(index)}
                            >
                                {checked[index] ? "✔️" : "❌"}
                            </button>
                        </li>
                    )}
                </ul>
            </div>


        </>
    );
}

export default ToDo;
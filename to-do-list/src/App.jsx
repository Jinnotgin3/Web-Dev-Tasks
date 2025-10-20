import { useState } from "react";
import ToDoForm from "./ToDoForm.jsx";
import ToDoList from "./ToDoList.jsx";

function App() {
    const [tasks, setTasks] = useState(["Brush teeth", "Bathe"]);
    const [checked, setChecked] = useState([false, false]);

    function addTask(newTask) {
        if (newTask.trim() === "")
            return alert("Empty Task Cannot Be Added!");

        setTasks(t => {
            const newTasks = [...t, newTask];
            const newChecked = [...checked, false];

            const combined = newTasks.map((task, i) => ({
                task, checked: newChecked[i],})
            );

            const reordered = [...combined.filter(t => !t.checked),
            ...combined.filter(t => t.checked)];

            setChecked(reordered.map(t => t.checked));
            return reordered.map(t => t.task);
        });
    };

    function deleteTask(index) {
        setTasks(t => t.filter((_, i) => i !== index));
        setChecked(c => c.filter((_, i) => i !== index));
    };

    function toggleCompletion(index) {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];

        const combined = tasks.map((task, i) => ({ task, checked: newChecked[i], })
        );

        const reordered = [
            ...combined.filter(combi => !combi.checked),
            ...combined.filter(combi => combi.checked),
        ];

        const updatedTasks = reordered.map(combi => combi.task);
        const updatedChecked = reordered.map(combi => combi.checked);

        setTasks(updatedTasks);
        setChecked(updatedChecked);
    };

    return (
        <div className="to-do-list">
            <h1>To-do List</h1>
            <ToDoForm addTask={addTask} />
            <ToDoList
                tasks={tasks}
                checked={checked}
                deleteTask={deleteTask}
                toggleCompletion={toggleCompletion}
            />
        </div>
    );
}

export default App;


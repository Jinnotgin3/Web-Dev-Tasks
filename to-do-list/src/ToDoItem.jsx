function ToDoItem({ task, isChecked, onDelete, onToggle }) {
    return (
        <li>
            <span className="task">{task}</span>
            <button className="del-btn" onClick={onDelete}>
                🗑️
            </button>
            <button className="toggle-btn" onClick={onToggle}>
                {isChecked ? "✔️" : "❌"}
            </button>
        </li>
    );
}

export default ToDoItem;

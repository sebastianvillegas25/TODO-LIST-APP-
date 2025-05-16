function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <strong>{todo.title}</strong>
      <p>📅 {todo.dueDate || "Sin fecha"}</p>
      <p>🏷 {todo.category || "Sin categoría"}</p>
      <p>🔥 Prioridad: {todo.priority}</p>
      <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
    </div>
  );
}

export default TodoItem;

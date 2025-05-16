import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Media");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    addTodo({
      title,
      dueDate,
      category,
      priority
    });

    // Limpiar campos
    setTitle("");
    setDueDate("");
    setCategory("");
    setPriority("Media");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <button type="submit">Agregar tarea</button>
    </form>
  );
}

export default TodoForm;

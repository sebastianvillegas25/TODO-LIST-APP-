// App.js
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaFireAlt, FaTrash } from 'react-icons/fa';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');
  const [detalle, setDetalle] = useState('');
  const [categoria, setCategoria] = useState('Media');
  const [filtro, setFiltro] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    document.body.className = modoOscuro ? 'dark' : '';
  }, [modoOscuro]);

  const agregarTarea = () => {
    if (!texto || !fecha || !detalle) return;
    const nuevaTarea = {
      id: Date.now(),
      texto,
      fecha,
      detalle,
      categoria,
      completada: false
    };
    setTareas([...tareas, nuevaTarea]);
    setTexto('');
    setFecha('');
    setDetalle('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const tareasFiltradas = tareas.filter(t => {
    const coincideFiltro =
      filtro === 'Todas' ||
      (filtro === 'Pendientes' && !t.completada) ||
      (filtro === 'Completadas' && t.completada);
    const coincideBusqueda = t.texto.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  return (
    <div className="App">
      <h1>Mi Lista de Tareas</h1>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría"
        value={detalle}
        onChange={e => setDetalle(e.target.value)}
      />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <button className="btn-agregar" onClick={agregarTarea}>Agregar tarea</button>

      <input
        type="text"
        placeholder="Buscar tarea..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <div className="filter-buttons">
        {['Todas', 'Pendientes', 'Completadas'].map(opcion => (
          <button
            key={opcion}
            className={filtro === opcion ? 'active' : ''}
            onClick={() => setFiltro(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      {tareasFiltradas.map(t => (
        <div key={t.id} className={`todo-item prioridad-${t.categoria.toLowerCase()}`}>
          <input
            type="checkbox"
            checked={t.completada}
            onChange={() => toggleCompletada(t.id)}
          />{' '}
          <strong>{t.texto}</strong>
          <p><FaCalendarAlt /> {t.fecha}</p>
          <p>{t.detalle}</p>
          <p><FaFireAlt /> Prioridad: {t.categoria}</p>
          <button onClick={() => eliminarTarea(t.id)}><FaTrash /> Eliminar</button>
        </div>
      ))}

      <button className="modo-btn" onClick={() => setModoOscuro(!modoOscuro)}>
        {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>
    </div>
  );
}


export default App;

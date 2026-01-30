import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Board = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = useCallback(async () => {
    const res = await api.get(`/todos/${id}`);
    setTodos(res.data);
  }, [id]);

  const addTodo = async () => {
    if (!title) return;
    await api.post(`/todos/${id}`, { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await api.put(`/todos/item/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (todoId) => {
    await api.delete(`/todos/item/${todoId}`);
    fetchTodos();
  };

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchTodos();
      })();
    }
  }, [id, fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="flex mb-4">
        <input
          className="border p-2 flex-1 mr-2 rounded"
          placeholder="New todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-3 rounded flex justify-between items-center"
          >
            <span
              onClick={() => toggleTodo(todo)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>

            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

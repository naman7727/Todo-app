import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth(); // ✅ wait for auth
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (error) {
      console.error("Failed to fetch boards", error);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/boards", { title });
      setTitle("");
      fetchBoards();
    } catch (error) {
      console.error("Failed to create board", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  useEffect(() => {
    if (user) {
      fetchBoards();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex mb-6">
        <input
          className="border p-2 flex-1 mr-2 rounded"
          placeholder="New board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createBoard}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading boards...</p>}

      {!loading && boards.length === 0 && (
        <p className="text-gray-500">No boards yet. Create one above.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((board) => (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
          >
            {board.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

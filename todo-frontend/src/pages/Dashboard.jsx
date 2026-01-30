import { useEffect, useState } from "react";
import api from "../services/api";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  const fetchBoards = async () => {
    const res = await api.get("/boards");
    setBoards(res.data);
  };

  const createBoard = async () => {
    if (!title) return;
    await api.post("/boards", { title });
    setTitle("");
    fetchBoards();
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      await fetchBoards();
    })();
  }, []);

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

      <div className="flex mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {boards.map((board) => (
    <div
      key={board._id}
      onClick={() => window.location.href = `/board/${board._id}`}
      className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
    >
      {board.title}
    </div>
  ))}
</div>

    </div>
  );
};

export default Dashboard;

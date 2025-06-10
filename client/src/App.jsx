import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/items/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/items", form);
    }
    setForm({ name: "", quantity: "", price: "" });
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-500 rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Inventory Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input className="w-full p-2 border rounded-2xl" placeholder="Name" value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded-2xl" placeholder="Quantity" type="number" value={form.quantity}
               onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input className="w-full p-2 border rounded-2xl" placeholder="Price" type="number" value={form.price}
               onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button className="bg-blue-700 rounded-2xl text-white px-4 py-2" type="submit">
          {editingId ? "Update" : "Add"} Item
        </button>
      </form>

      <ul className="space-y-2">
        {items.map(item => (
          <li key={item._id} className="border p-3 flex justify-between items-center rounded-2xl">
            <div>
              <strong>{item.name}</strong> - Qty: {item.quantity}, ₹{item.price}
            </div>
            <div className="space-x-2">
              <button className="bg-green-500 px-2 text-white rounded" onClick={() => handleEdit(item)}>Edit</button>
              <button className="bg-red-500 px-2 text-white rounded" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

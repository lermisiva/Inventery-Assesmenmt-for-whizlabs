import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "", description: "", category: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    console.log("Received items:", res.data);
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
    setForm({ name: "", quantity: 0, price: 0, description: "", category: "" });
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
    <div className="">
      <div className="max-w-xl mx-auto p-4 bg-gray-500 rounded-2xl mt-10">
        <h1 className="text-2xl font-bold mb-4">Inventory Manager</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <input className="w-full p-2 border rounded-2xl" placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input
            className="w-full p-2 border rounded-2xl"
            placeholder="Quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => {
              const value = Math.max(0, e.target.valueAsNumber || 0);
              setForm({ ...form, quantity: value });
            }}
          />

          <input className="w-full p-2 border rounded-2xl" placeholder="Price" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0})} />

          <input className="w-full p-2 border rounded-2xl" placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <input className="w-full p-2 border rounded-2xl" placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <button className="bg-blue-700 rounded-2xl text-white px-4 py-2" type="submit">
            {editingId ? "Update" : "Add"} Item
          </button>
        </form>
      </div>
    <div className="mx-20 p-4 bg-gray-500 rounded-2xl mt-10">
  <div className="space-y-2">
    {/* Headline Row */}
    <div className="flex justify-between items-center p-3 bg-gray-300 rounded-2xl font-bold">
      <span className="w-3/12 px-2">Name</span>
      <span className="w-2/12 px-2">Price</span>
      <span className="w-2/12 px-2">Quantity</span>
      <span className="w-3/12 px-2">Description</span>
      <span className="w-2/12 px-2">Category</span>
      <span className="w-2/12 px-2">Actions</span>
    </div>

    {/* List Items */}
    {items.length === 0 ? (
      <div className="text-center py-8 text-white">
        No items found
      </div>
    ) : (
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item._id} className="border p-3 flex justify-between items-center rounded-2xl bg-white">
            <div className="flex justify-between w-full items-center">
              <span className="w-3/12 truncate">{item.name}</span>
              <span className="w-2/12">₹{item.price}</span>
              <span className="w-2/12">{item.quantity}</span>
              <span className="w-3/12 truncate">{item.description || "-"}</span>
              <span className="w-2/12 truncate">{item.category || "-"}</span>
              <div className="w-2/12 space-x-2">
                <button 
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
    </div>
  );
}

export default App;

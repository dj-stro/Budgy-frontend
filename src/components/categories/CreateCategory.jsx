import React, { useState } from "react";
import { useCategories } from "../../contexts/CategoryContext";

const CreateCategory = () => {
  const { categories, createCategory } = useCategories();
  const [name, setName] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await createCategory(name, type);
    setName("");
  };

  return (
    <div className="container mt-4">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Category name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="ASSET">Asset</option>
          <option value="LIABILITY">Liability</option>
          <option value="EQUITY">Equity</option>
          <option value="TRANSFER">Transfer</option>
        </select>
        <button className="btn btn-primary mt-2" type="submit">
          Save Category
        </button>
      </form>

      <ul className="mt-3">
        {categories.map((c) => (
          <li key={c.id}>
            {c.name} ({c.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;

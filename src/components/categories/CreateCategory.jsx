import { useState, useEffect } from "react";
import {
  createCategory,
  getAllCategories,
} from "../../services/categoryService";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    console.log(
      "handleChange:",
      e.target.name,
      e.target.value,
      typeof e.target.value
    );
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending:", formData);
    console.log("Payload to API:", JSON.stringify(formData));
    createCategory(formData)
      .then(() => {
        alert("Category Created!");
      })
      .catch((err) => {
        console.error("Axios error:", err.response?.data || err.message);
        console.error(err);
        alert("Failed to create category.");
      });
  };

  const loadCategories = () => {
  getAllCategories()
    .then((data) => {
      console.log("API response:", data);
      setCategories(data || []); // prevent undefined
    })
    .catch((err) => {
      console.error("Failed to load categories:", err);
      setCategories([]); // safe fallback
    });
};

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Type</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
            <option value="ASSET">Asset</option>
            <option value="LIABILITY">Liability</option>
            <option value="EQUITY">Equity</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Save Category
        </button>
      </form>
      {/* CATEGORY LIST */}
      <div className="mt-4">
        <h4>Existing Categories</h4>
        <ul className="list-group">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{cat.name}</span>
              <span className="badge bg-secondary">{cat.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;

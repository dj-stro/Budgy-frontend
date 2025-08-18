import { useState } from "react";
import { createCategory } from "../services/categoryService";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: [e.target.value]})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(formData)
        .then(() => {
            alert("Category Created!")
        })
        .catch((err) => {
            console.err(err);
            alert("Failed to create category.")
        })
  }

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
    </div>
  );
};

export default CreateCategory;
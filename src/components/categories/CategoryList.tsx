import React from "react";
import type { CategoryListProps, CategoryType } from "../../types/models.js";

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="mt-4">
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
  );
}

export default CategoryList;

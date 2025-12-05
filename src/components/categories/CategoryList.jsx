function CategoryList({ categories }) {
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

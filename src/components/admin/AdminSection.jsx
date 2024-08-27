import { useState } from "react";

function AdminSection({ title, items, onDelete }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const itemsToShow = showAll ? items : items.slice(0, 12);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsToShow.map((item) => (
              <tr key={item.ID} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{item.ID}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => onDelete(item.ID)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length > 12 && (
        <div className="mt-4">
          <button
            onClick={toggleShowAll}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminSection;

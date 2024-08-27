function TrainTable({ trains }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl text-black font-bold mb-4">Trains</h2>
      <div className="overflow-x-auto text-slate-800">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Number</th>
              <th className="py-3 px-6 text-left">Model</th>
              <th className="py-3 px-6 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.Number} className="border-b">
                <td className="py-3 px-6">{train.Number}</td>
                <td className="py-3 px-6">{train.Model}</td>
                <td className="py-3 px-6">{train.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainTable;

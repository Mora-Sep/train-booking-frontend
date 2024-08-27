function RouteTable({ routes }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl text-black font-bold mb-4">Routes</h2>
      <div className="overflow-x-auto text-slate-800">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Route ID</th>
              <th className="py-3 px-6 text-left">Origin</th>
              <th className="py-3 px-6 text-left">Destination</th>
              <th className="py-3 px-6 text-left">Duration (Minutes)</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.Route_ID} className="border-b">
                <td className="py-3 px-6">{route.Route_ID}</td>
                <td className="py-3 px-6">{route.Origin}</td>
                <td className="py-3 px-6">{route.Destination}</td>
                <td className="py-3 px-6">{route.Duration_Minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RouteTable;

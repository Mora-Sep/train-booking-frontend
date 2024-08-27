import AddTrain from "./../components/deo/AddTrain";
import AddModel from "./../components/deo/AddModel";
import AddStation from "./../components/deo/AddStation";
import AddRoute from "./../components/deo/AddRoute";

function AddSection() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded">
      <AddModel />
      <AddTrain />
      <AddStation />
      <AddRoute />
    </div>
  );
}

export default AddSection;

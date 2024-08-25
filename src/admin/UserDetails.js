import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserDetails = () => {
  const token = Cookies.get("access-token");
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchAdminDetails() {
      return await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/admin/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    fetchAdminDetails().then((res) => {
      setDetails(res.data);
    });
  }, [token]);

  return (
    <div className="max-w-md mx-auto text-black mt-20 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Admin Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Username:</span>
          <span>{details.Username}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">First Name:</span>
          <span>{details.FirstName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Last Name:</span>
          <span>{details.LastName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Role:</span>
          <span>{details.Role}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

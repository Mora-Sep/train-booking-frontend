import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    // Define the base URL and token
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = Cookies.get("access-token");

    // Fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${baseURL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [baseURL, token]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission for password update
    const handleUpdate = async () => {
        try {
            await axios.put(`${baseURL}/users/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Password updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">
                {isEditing ? 'Edit Password' : 'User Profile'}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Display user details in a two-column layout */}
                {Object.keys(userData).map((key) => (
                    key !== 'currentPassword' && key !== 'newPassword' && (
                        <div key={key} className="flex items-center">
                            <label className="w-32 font-medium text-gray-700">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <span className="flex-1 p-2 border border-gray-300 rounded-md">
                                {userData[key]}
                            </span>
                        </div>
                    )
                ))}
            </div>
            {/* Password change section */}
            {isEditing && (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <label className="w-32 font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            )}
            <div className="flex space-x-4 mt-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Change Password
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserDetails;

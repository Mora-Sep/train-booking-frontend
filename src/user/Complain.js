import React, { useState } from 'react';
import axios from 'axios';

const Complain = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        complain: ''
    });
    const [complainId, setComplainId] = useState('');
    const [message, setMessage] = useState('');

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate a random complain ID
        const id = `CMP-${Date.now()}`;
        setComplainId(id);

        try {
            // Send email to the admin (technical email for testing)
            await axios.post(`${BASE_URL}/send-email`, {
                to: 'gayanchalana@gmail.com',
                subject: `New Complain Received - ID: ${id}`,
                body: `
                    Complain ID: ${id}
                    Name: ${formData.name}
                    Email: ${formData.email}
                    Phone: ${formData.phone}

                    Complain:
                    ${formData.complain}
                `
            });

            // Send confirmation email to the user
            await axios.post(`${BASE_URL}/send-email`, {
                to: formData.email,
                subject: `Your Complain ID: ${id}`,
                body: `Thank you for your complain. Our team will look into it shortly.\n\nYour Complain ID is: ${id}`
            });

            setMessage('Your complain has been submitted. We will look into it shortly.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                complain: ''
            });
        } catch (error) {
            console.error('Error submitting complain:', error);
            setMessage('There was an error submitting your complain. Please try again later.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-blue-600 mb-4">Submit Your Complain</h1>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Complain</label>
                    <textarea
                        name="complain"
                        value={formData.complain}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="5"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit Complain
                </button>
            </form>
        </div>
    );
};

export default Complain;

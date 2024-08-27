import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000); // Changed to 2 seconds for faster redirection

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200 text-red-800 text-center font-sans p-4">
      <h1 className="text-9xl font-bold mb-4">Unauthorized Access!</h1>
      <p className="text-3xl">You are not authorized to view this page. Please log in.</p>
      <p className="text-3xl font-serif font-semibold text-blue-700 pt-10">You will redirect shortly</p>
      <div className="flex items-center justify-center space-x-2 mt-6">
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
}

export default Unauthorized;

import { useState } from "react";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const toastID = toast.loading("Sending reset link...", {
        className: "custom-toast",
      });
      const response = await fetch(`${BASE_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent! Please check your email.");
        setError("");
        toast.success("Reset link sent successfully!", {
          id: toastID,
          className: "custom-toast",
        });
      } else {
        setError(data.message || "Something went wrong");
        setMessage("");
        toast.error(data.message || "Failed to send reset link", {
          id: toastID,
          className: "custom-toast",
        });
      }
    } catch (error) {
      setError("Server error, please try again later");
      setMessage("");
      toast.error("Server error, please try again later", {
        className: "custom-toast",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

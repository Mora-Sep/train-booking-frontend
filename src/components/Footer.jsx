import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="p-10 bg-gradient-to-r from-blue-600 to-purple-800 text-black">
      <div className="flex flex-row justify-between items-center mb-10">
        <img
          className="w-40 h-20"
          src="/Main/logo-no-background.png"
          alt="logo"
        />
        <div className="flex flex-col text-center">
          <span className="text-xl text-white font-semibold">
            Planning your next trip?
          </span>
          <span className="text-sm mt-1 text-white">
            Subscribe to our newsletter. Get the latest travel and trend deals!
          </span>
        </div>
        <div className="flex items-center">
          <input
            className="w-64 rounded-l-full border border-gray-300 p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800"
            type="email"
            placeholder="Enter your email ID"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-r-full shadow-md transition-all duration-300 ease-in-out">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-7 text-white">
          <Link className="hover:text-gray-600 transition duration-300">
            About US
          </Link>
          <Link className="hover:text-gray-600 transition duration-300">
            Mobile
          </Link>
          <Link className="hover:text-gray-600 transition duration-300">
            Privacy
          </Link>
          <Link className="hover:text-gray-600 transition duration-300">
            Terms of Use
          </Link>
          <Link className="hover:text-gray-600 transition duration-300">
            Career
          </Link>
          <Link className="hover:text-gray-600 transition duration-300">
            Customer Service
          </Link>
        </div>
        <div className="flex flex-row space-x-5">
          <img
            className="hover:opacity-80 transition duration-300"
            src="/Main/facebook icon.png"
            alt="facebook"
          />
          <img
            className="hover:opacity-80 transition duration-300"
            src="/Main/instagram.png"
            alt="instagram"
          />
          <img
            className="hover:opacity-80 transition duration-300"
            src="/Main/twitter icon.png"
            alt="twitter"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

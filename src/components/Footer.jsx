import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="p-10 bg-[#0578FF] text-white">
      <div className="flex flex-row justify-between mb-10">
        <img
          className="w-40 h-20"
          src="/Main/logo-no-background.png"
          alt="logo"
        />
        <div className="flex-col">
          <span className="text-xl font-semibold">
            Planning your next trip?
          </span>
          <br />
          <span className="text-xs">
            Subscribe to our newsletter. Get the latest travel and trend deals!
          </span>
        </div>
        <div>
          <input
            className="w-80"
            type="email"
            placeholder="Enter your email ID"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row align-middle justify-between">
          <Link className="mr-7">About US</Link>
          <Link className="mr-7">Mobile</Link>
          <Link className="mr-7">Privacy</Link>
          <Link className="mr-7">Terms of Use</Link>
          <Link className="mr-7">Career</Link>
          <Link className="mr-7">Customer Service</Link>
        </div>
        <div className="flex flex-row">
          <img className="mr-3" src="/Main/facebook icon.png" alt="facebook" />
          <img className="mr-3" src="/Main/instagram.png" alt="instagram" />
          <img src="/Main/twitter icon.png" alt="twitter" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

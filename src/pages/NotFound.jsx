import { Header } from "../components/Header";
import { Link } from "react-router";
import "./NotFound.css";

export function NotFound() {
  return (
    <>
      <Header />
      <title>Not Found</title>
      <div className="notfound-page">
        <div className="notfound-container">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link to="/" className="home-button">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}

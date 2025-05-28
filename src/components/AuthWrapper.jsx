import React, { useState, useEffect } from "react";

const AuthWrapper = ({ children, password: correctPassword = "123456", persist = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check persisted auth state (e.g., after page refresh)
  useEffect(() => {
    if (persist) {
      const savedAuth = localStorage.getItem("isAuthenticated");
      if (savedAuth === "true") setIsAuthenticated(true);
    }
  }, [persist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
      if (persist) localStorage.setItem("isAuthenticated", "true");
    } else {
      setError("Incorrect password!");
    }
  };

  // Logout function (optional)
  const handleLogout = () => {
    setIsAuthenticated(false);
    if (persist) localStorage.removeItem("isAuthenticated");
  };

  if (!isAuthenticated) {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-5 card shadow p-4 bg-secondary">
        <div className="authwrapper">
          <h3>🔒 Authentication Required</h3>
        <form onSubmit={handleSubmit} className="auth-form">
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            />
          <button type="submit">Enter</button>
          {error && <p className="error">{error}</p>}
        </form>
        </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {/* Optional logout button */}
      {persist && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </>
  );
};

export default AuthWrapper;
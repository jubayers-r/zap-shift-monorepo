import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    setLoading(false);
    return navigate("/login", { state: { from: location.pathname } });
  }

  return children;
};

export default PrivetRoute;

import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const requireAuth = (WrappedComponent) => {
  const HOC = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("refresh_token");
      if (!token) {
        navigate("/auth/login");
      }
    }, [navigate]);

    return <WrappedComponent />;
  };

  return HOC;
};

export default requireAuth;
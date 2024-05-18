import React, { useEffect, useState } from "react";
import TestService from "../../../services/TestService";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    TestService.getTestApi()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setError("Không thể lấy dữ liệu từ API");
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {message ? <p>{message}</p> : <p>Đang tải...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;

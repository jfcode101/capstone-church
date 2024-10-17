import React, { useEffect, useState } from "react";
import axios from "axios";

const SermonsPage = () => {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await axios.get("/api/posts"); // Adjust the URL based on your backend setup
        setSermons(response.data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      }
    };

    fetchSermons();
  }, []);

  return (
    <div>
      <h1>Sermons</h1>
      <ul>
        {sermons.map((sermon) => (
          <li key={sermon._id}>
            <h2>{sermon.title}</h2>
            <p>{sermon.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SermonsPage;

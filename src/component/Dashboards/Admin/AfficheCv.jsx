import React, { useState, useEffect } from "react";
import axios from "axios";
//import SidebarComponent from "./Sidebar";
function AllCv({ search }) {
  const [cv, setCv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de l'API backend
  const API_URL = "http://localhost:3300/api/v1/CV/All-cv";

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        console.log("Auth Token:", token); // Log the token for debugging

        if (!token) {
          throw new Error("No authentication token found."); // Throw error if no token
        }

        // Make API call with the token in headers
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        console.log("Response data:", response.data); // Log response data for debugging
        setCv(response.data.data); // Set CV data from response
      } catch (err) {
        console.error("Error fetching CVs:", err);
        setError(err.response ? err.response.data.message : "Network error occurred.");
      } finally {
        setLoading(false); // Ensure loading state is updated regardless of success or failure
      }
    };

    fetchCvs();
  }, []); // Fetch CVs on component mount

  // Normalize search input for case-insensitive matching
  const normalizedSearch = search?.toLowerCase() || "";

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    
    <div className="d-flex gap-3 justify-content-center p-3 flex-wrap">
      {Array.isArray(cv) && cv.length > 0 ? (
        cv
          .filter((e) => {
            return (
              e.name?.toLowerCase().includes(normalizedSearch) ||
              e.email?.toLowerCase().includes(normalizedSearch) || 
              e.phone?.toLowerCase().includes(normalizedSearch)
            );
          })
          .map((e, i) => (
            <div className="card shadow p-3" style={{ width: "18rem" }} key={i}>
              <h5 className="card-title">Name: {e.name}</h5>
              <h5 className="card-text">Email: {e.email}</h5>
              <h5 className="card-text">Phone: {e.phone}</h5>
              <h5 className="card-text">GitHub: {e.gitHub || "N/A"}</h5>
              <h5 className="card-text">LinkedIn: {e.linkedin || "N/A"}</h5>
              <a
                className="btn btn-primary"
                href={`http://localhost:3300/${e.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File
              </a>
            </div>
          ))
      ) : (
        <div>No CVs found.</div> // Message when no CVs match the search criteria
      )}
    </div>
  );
}

export default AllCv;

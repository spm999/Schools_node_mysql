import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import './main.css'
const ShowSchool = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5172/show-school');
        if (response.ok) {
          const data = await response.json();
          setSchools(data);
        } else {
          console.error('Failed to fetch schools');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
<div className="school-container">
  <h2>Show School</h2>
  <ul className="school-list">
    {schools.map((school) => (
      <li key={school.id} className="school-item">
        <strong className="school-label">Name:</strong> {school.name}<br />
        <strong className="school-label">City:</strong> {school.city}<br />
        <strong className="school-label">State:</strong> {school.state}<br />
        <strong className="school-label">Address:</strong> {school.address}<br />
        <strong className="school-label">Contact:</strong> {school.contact}<br />
        <strong className="school-label">Email ID:</strong> {school.email_id}<br />
        <strong className="school-label">Image:</strong> <img
          className="school-image"
          src={`http://localhost:5172/schoolImages/${school.image}`}
          alt={school.name}
        /><br />
      </li>
    ))}
  </ul>

  <p className="link-text">Want to add schools? <Link to="/add-school">Click Here</Link></p>
</div>

  );
};

export default ShowSchool;

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    salary: "",
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/emp1?page=${page}&limit=${limit}`)
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, [page, limit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/emp1", formData)
      .then(() => {
        alert("Employee added successfully");
        setFormData({ name: "", position: "", salary: "" });
        axios
          .get(`http://localhost:5000/emp1?page=${page}&limit=${limit}`)
          .then((response) => setEmployees(response.data));
      })
      .catch((error) => alert("Error adding employee"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  
    <div className="App">
      <h1>Employee Table</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> name </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="position"> position </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="enter your position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Salary"> Salary </label>
          <input
            type="number"
            id="Salary"
            name="salary"
            placeholder="enter your salary "
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add employee</button>
      </form>
  
      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

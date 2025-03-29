import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./RegisterInterns.css";


const RegisterInterns = () => {
  const [intern, setIntern] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "Intern@123", // Default password
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setIntern({ ...intern, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Intern ${intern.username} registered successfully!`);
    setIntern({ firstName: "", lastName: "", username: "", password: "Intern@123" });
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = () => {
    if (!file) {
      alert("Please upload an Excel file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      console.log("Bulk Intern Data:", parsedData);
      alert("Interns registered successfully from Excel!");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="register-interns">
      <h2>Register Intern</h2>

      {/* Single Intern Registration */}
      <form onSubmit={handleSubmit} className="intern-form">
        <input type="text" name="firstName" placeholder="First Name" value={intern.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={intern.lastName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={intern.username} onChange={handleChange} required />
        <input type="password" name="password" value={intern.password} disabled />
        <button type="submit">Register Intern</button>
      </form>

      {/* Bulk Intern Registration via Excel */}
      {/* <h2>Bulk Upload</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleBulkUpload}>Upload & Register</button> */}
    </div>
  );
};

export default RegisterInterns;

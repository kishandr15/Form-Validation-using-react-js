import React, { useState } from "react";
import "./App.css";

const App = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // State variable for form submission status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true); // Set form submission status to true upon successful validation
      console.log("Form submitted successfully");
      // Proceed with form submission or other actions
    } else {
      console.log("Form has errors");
    }
  };


// trim() removes whitespace from both ends of a string and if the string is empty, it returns an empty string.

  const validateForm = (data) => {

    let errors = {};
    if (!data.username.trim()) { 
      errors.username = "Username cannot be empty";
    }

    if (!data.email.trim()) {
      errors.email = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }


    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(data.password)
    ) {
      errors.password =
        "Password must contain at least one lowercase letter, one number, and one special character";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    



    if (data.password !== data.password2) {
      errors.password2 = "Passwords do not match";
    }


    if (!data.age) {
      errors.age = "Age cannot be empty";
    } else if (data.age < 18 || data.age > 100) {
      errors.age = "Age must be between 18 and 100";
    }

    if (!data.gender) {
      errors.gender = "Gender cannot be empty";
    }

    return errors;
  };


  return (
      <div className="container">
        <form id="form" className="form" onSubmit={handleSubmit}>
        <h2>Form Validation App</h2>
        {submitted && !Object.keys(errors).length && (
          <div className="success-message">Form submitted successfully</div>
        )}
        <div className={`form-control ${errors.username && "error"}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div className={`form-control ${errors.email && "error"}`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className={`form-control ${errors.password && "error"}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div className={`form-control ${errors.password2 && "error"}`}>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Enter password again"
            value={formData.password2}
            onChange={handleChange}
          />
          {errors.password2 && <small>{errors.password2}</small>}
        </div>

        <div className={`form-control ${errors.age && "error"}`}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            min="18"
            max="100"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <small>{errors.age}</small>}
        </div>

        <div className={`form-control select ${errors.gender && "error"}`}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <small>{errors.gender}</small>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;

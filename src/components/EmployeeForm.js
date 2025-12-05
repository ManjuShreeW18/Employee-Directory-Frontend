import React from "react";

const EmployeeForm = ({ employee, setEmployee, readOnly = false, showPassword = true, showRequiredMark = false }) => {

  // Handle input or select changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const requiredStar = showRequiredMark ? <span style={{ color: "red" }}>*</span> : null;

  return (
    <div className="employee-form-container">
      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name {requiredStar}</label>
        <input
          id="fullName"
          name="fullName"
          value={employee.fullName || ""}
          onChange={handleChange}
          disabled={readOnly} 
          required={showRequiredMark}
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email {requiredStar}</label>
        <input
          id="email"
          type="email"
          name="email"
          value={employee.email || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Phone */}
      <div className="form-group">
        <label htmlFor="phone">Phone {requiredStar}</label>
        <input
          id="phone"
          name="phone"
          value={employee.phone || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Password */}
      {showPassword && (
        <div className="form-group">
          <label htmlFor="password">Password {requiredStar}</label>
          <input
            id="password"
            type='password'
            name="password"
            value={employee.password || ""}
            onChange={handleChange}
            disabled={readOnly}
            required={showRequiredMark}
          />
        </div>
      )}

      {/* Date of Birth */}
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth {requiredStar}</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={employee.dateOfBirth || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Date of Joining */}
      <div className="form-group">
        <label htmlFor="dateOfJoining">Date of Joining {requiredStar}</label>
        <input
          id="dateOfJoining"
          type="date"
          name="dateOfJoining"
          value={employee.dateOfJoining || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="location">Location {requiredStar}</label>
        <input
          id="location"
          name="location"
          value={employee.location || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Designation */}
      <div className="form-group">
        <label htmlFor="designation">Designation {requiredStar}</label>
        <input
          id="designation"
          name="designation"
          value={employee.designation || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Role selection */}
      <div className="form-group">
        <label htmlFor="role">Role {requiredStar}</label>
        <select
          id="role"
          name="role"
          value={employee.role || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        >
          <option value="">Select Role</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {/* Status selection */}
      <div className="form-group">
        <label htmlFor="status">Status {requiredStar}</label>
        <select
          id="status"
          name="status"
          value={employee.status || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Gender selection */}
      <div className="form-group">
        <label htmlFor="gender">Gender {requiredStar}</label>
        <select
          id="gender"
          name="gender"
          value={employee.gender || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Current Address */}
      <div className="form-group">
        <label htmlFor="currentAddress">Current Address {requiredStar}</label>
        <input
          id="currentAddress"
          name="currentAddress"
          value={employee.currentAddress || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Nationality */}
      <div className="form-group">
        <label htmlFor="nationality">Nationality {requiredStar}</label>
        <input
          id="nationality"
          name="nationality"
          value={employee.nationality || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {/* Marital Status selection */}
      <div className="form-group">
        <label htmlFor="maritalStatus">Marital Status {requiredStar}</label>
        <select
          id="maritalStatus"
          name="maritalStatus"
          value={employee.maritalStatus || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        >
          <option value="">Select</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>

      {/* Department selection */}
      <div className="form-group">
        <label htmlFor="department">Department {requiredStar}</label>
        <select
          id="department"
          name="department"
          value={employee.department || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
          <option value="Testing">Testing</option>
          <option value="L&D">L&D</option>
          <option value="Management">Management</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeForm;

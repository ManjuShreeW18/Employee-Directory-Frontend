import React from "react";

const EmployeeForm = ({ employee, setEmployee, readOnly = false, showPassword = true, showRequiredMark = false }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const requiredStar = showRequiredMark ? <span style={{ color: "red" }}>*</span> : null;

  return (
    <div className="employee-form-container">
      <div className="form-group">
        <label>Full Name {requiredStar}</label>
        <input
          name="fullName"
          value={employee.fullName || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Email {requiredStar}</label>
        <input
          type="email"
          name="email"
          value={employee.email || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Phone {requiredStar}</label>
        <input
          name="phone"
          value={employee.phone || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      {showPassword && (
        <div className="form-group">
          <label>Password {requiredStar}</label>
          <input
            type='password'
            name="password"
            value={employee.password || ""}
            onChange={handleChange}
            disabled={readOnly}
            required={showRequiredMark}
          />
        </div>
      )}

      <div className="form-group">
        <label>Date of Birth {requiredStar}</label>
        <input
          type="date"
          name="dateOfBirth"
          value={employee.dateOfBirth || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Date of Joining {requiredStar}</label>
        <input
          type="date"
          name="dateOfJoining"
          value={employee.dateOfJoining || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Location {requiredStar}</label>
        <input
          name="location"
          value={employee.location || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Designation {requiredStar}</label>
        <input
          name="designation"
          value={employee.designation || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Role {requiredStar}</label>
        <select
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

      <div className="form-group">
        <label>Status {requiredStar}</label>
        <select
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

      <div className="form-group">
        <label>Gender {requiredStar}</label>
        <select
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

      <div className="form-group">
        <label>Current Address {requiredStar}</label>
        <input
          name="currentAddress"
          value={employee.currentAddress || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Nationality {requiredStar}</label>
        <input
          name="nationality"
          value={employee.nationality || ""}
          onChange={handleChange}
          disabled={readOnly}
          required={showRequiredMark}
        />
      </div>

      <div className="form-group">
        <label>Marital Status {requiredStar}</label>
        <select
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

      <div className="form-group">
        <label>Department {requiredStar}</label>
        <select
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

import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe('EmployeeForm (Behavior-driven)', () => {

    const employee = {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        dateOfBirth: '',
        dateOfJoining: '',
        location: '',
        designation: '',
        role: '',
        status: '',
        gender: '',
        currentAddress: '',
        nationality: '',
        maritalStatus: '',
        department: ''
    };

    test('should render all the fields', () => {
        const setEmployee = jest.fn();
        render(<EmployeeForm employee={employee} setEmployee={setEmployee} showRequiredMark={true} />);

        // Text inputs
        expect(screen.getByLabelText(/^Full Name \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Email \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Phone \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Date of Birth \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Date of Joining \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Location \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Designation \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Current Address \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Nationality \*/i)).toBeInTheDocument();

        // Select inputs
        expect(screen.getByLabelText(/^Role \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Status \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Gender \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Marital Status \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Department \*/i)).toBeInTheDocument();
    });

    test('should call setEmployee when text input changes', () => {
        const setEmployee = jest.fn();
        render(<EmployeeForm employee={employee} setEmployee={setEmployee} showRequiredMark={true} />);

        const fullNameInput = screen.getByLabelText(/^Full Name \*/i);
        fireEvent.change(fullNameInput, { target: { value: 'Manju Shree' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ fullName: 'Manju Shree' }));

        const emailInput = screen.getByLabelText(/^Email \*/i);
        fireEvent.change(emailInput, { target: { value: 'manju@example.com' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ email: 'manju@example.com' }));

        const phoneInput = screen.getByLabelText(/^Phone \*/i);
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ phone: '1234567890' }));
    });

    test('should call setEmployee when select input changes', () => {
        const setEmployee = jest.fn();
        render(<EmployeeForm employee={employee} setEmployee={setEmployee} showRequiredMark={true} />);

        const roleSelect = screen.getByLabelText(/^Role \*/i);
        fireEvent.change(roleSelect, { target: { value: 'HR' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ role: 'HR' }));

        const statusSelect = screen.getByLabelText(/^Status \*/i);
        fireEvent.change(statusSelect, { target: { value: 'Active' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ status: 'Active' }));

        const genderSelect = screen.getByLabelText(/^Gender \*/i);
        fireEvent.change(genderSelect, { target: { value: 'Female' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ gender: 'Female' }));

        const maritalStatusSelect = screen.getByLabelText(/^Marital Status \*/i);
        fireEvent.change(maritalStatusSelect, { target: { value: 'Single' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ maritalStatus: 'Single' }));

        const departmentSelect = screen.getByLabelText(/^Department \*/i);
        fireEvent.change(departmentSelect, { target: { value: 'IT' } });
        expect(setEmployee).toHaveBeenCalledWith(expect.objectContaining({ department: 'IT' }));
    });
});

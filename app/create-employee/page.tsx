"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Fields: First Name, Middle Name, Last Name, Street Address, Barangay, City, Province, Country, Zip Code, Status, Department, Position, Basic Pay, Income Tax
// DropDown for Status: Active, Inactive
// CRUD Table for Earnings and Deductions
// Button: Save, Cancel
// Additional Notes: Selecting a department should populate the positions dropdown with the positions available in that department

const CreateEmployeePage = () => {
  // Setting up Interfaces
  interface Earning {
    earningType: string;
    value: number;
  }

  interface Deduction {
    deductionType: string;
    value: number;
  }
  interface Department {
    id: string;
    name: string;
  }

  interface Position {
    id: string;
    title: string;
    departmentId: string;
  }
  // Initializing States
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [status, setStatus] = useState("Active");
  const [department, setDepartment] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [basicPay, setBasicPay] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const [earningType, setEarningType] = useState("");
  const [earningAmount, setEarningAmount] = useState(0);
  const [earnings, setEarnings] = useState<Earning[]>([]);

  const [deductionType, setDeductionType] = useState("");
  const [deductionAmount, setDeductionAmount] = useState(0);
  const [deductions, setDeductions] = useState<Deduction[]>([]);

  // Initializing Router
  const router = useRouter();

  // Fetch Departments
  const fetchDepartments = async () => {
    const response = await fetch("http://localhost:3000/api/department", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setDepartments(data);
    return data;
  };

  // fetch Positions function
  const fetchPositions = async (departmentId: number) => {
    const response = await fetch(
      `http://localhost:3000/api/department/${departmentId}/positions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setPositions(data);
    return data;
  };

  // client side rendering for departments dropdown
  useEffect(() => {
    fetchDepartments().catch((error) => console.log(error));
  }, []);

  // client side rendering for positions dropdown
  useEffect(() => {
    if (department) {
      fetchPositions(department).catch((error) => console.log(error));
    }
  }, [department]);

  // Send a POST request to your API to create a new employee...
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          contactNumber,
          streetAddress,
          barangay,
          city,
          province,
          country,
          zipCode,
          status,
          position,
          basicPay,
          incomeTax,
          username,
          password,
          role,
          earnings,
          deductions,
        }),
      });
      router.push("/employees-page");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEarning = () => {
    setEarnings([
      ...earnings,
      { earningType: earningType, value: earningAmount },
    ]);
    setEarningType("");
    setEarningAmount(0);
  };

  const handleDeleteEarning = (index: number) => {
    setEarnings(earnings.filter((_, i) => i !== index));
  };

  // Handle Add Deduction
  const handleAddDeduction = () => {
    setDeductions([
      ...deductions,
      { deductionType: deductionType, value: deductionAmount },
    ]);
    setDeductionType("");
    setDeductionAmount(0);
  };

  const handleDeleteDeduction = (index: number) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-2">Create New Employee</h2>
        <div className="flex gap-12 p-10 bg-slate-200 rounded-lg shadow-md">
          {/* Name Form */}
          <div className="flex flex-col">
            <label className="flex flex-col">
              First Name:
              <input
                type="text"
                className="border-2 rounded-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Middle Name:
              <input
                type="text"
                className="border-2 rounded-full"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Last Name:
              <input
                type="text"
                className="border-2 rounded-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            {/* Address Form */}
            <label className="flex flex-col">
              Email:
              <input
                type="text"
                className="border-2 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Contact Number:
              <input
                type="text"
                className="border-2 rounded-full"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Street Address:
              <input
                type="text"
                className="border-2 rounded-full"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Barangay:
              <input
                type="text"
                className="border-2 rounded-full"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              City:
              <input
                type="text"
                className="border-2 rounded-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Province:
              <input
                type="text"
                className="border-2 rounded-full"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              Country:
              <input
                type="text"
                className="border-2 rounded-full"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              ZIP Code:
              <input
                type="text"
                className="border-2 rounded-full"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </label>
          </div>

          {/* Employee Pay and Position Form */}
          <div className="flex flex-col">
            <label className="flex flex-col">
              Basic Pay:
              <input
                type="text"
                className="border-2 rounded-full"
                value={basicPay}
                onChange={(e) => setBasicPay(parseFloat(e.target.value))}
              />
            </label>

            <label className="flex flex-col hidden">
              Income Tax:
              <input
                type="text"
                className="border-2 rounded-full"
                value={incomeTax}
                onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
              />
            </label>

            <label className="flex flex-col">
              Department:
              <select
                value={department}
                onChange={(e) => setDepartment(parseInt(e.target.value))}
              >
                <option value="" selected>
                  Select a department
                </option>
                {departments.map((department, key) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              Position:
              <select
                value={position}
                onChange={(e) => setPosition(parseInt(e.target.value))}
              >
                {/* Ignore Error It works fine */}
                {positions &&
                  positions.map((position, key) => (
                    <option key={position.id} value={position.id}>
                      {position.title}
                    </option>
                  ))}
              </select>
            </label>

            <label className="flex flex-col">
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Resigned">Resigned</option>
                <option value="AWOL">AWOL</option>
              </select>
            </label>

            <label className="flex flex-col">
              Username:
              <input
                type="text"
                className="border-2 rounded-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              Password:
              <input
                type="text"
                className="border-2 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              User Role:
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Employee">Regular Employee</option>
                <option value="Department Manager">Department Manager</option>
                <option value="Payroll Manager">Payroll Manager</option>
                <option value="Administrator">Administrator</option>
              </select>
            </label>
          </div>
        </div>

        {/* Earnings Table*/}
        {/* TODO: Add a table for earnings that adds a row when Add Row button is clicked */}
        {/* Fields: Earnings, Amount */}
        <div className="flex flex-col p-10 bg-slate-200 rounded-lg shadow-md">
          <h2 className="font-bold text-2xl">Earnings</h2>

          {/* Form to add earning type and amount */}

          <div className="flex gap-4 items-center">
            <label htmlFor="">Earning Type: </label>
            <input
              type="text"
              value={earningType}
              onChange={(e) => setEarningType(e.target.value)}
            />
            <label htmlFor="">Value: </label>
            <input
              type="text"
              value={earningAmount}
              onChange={(e) => setEarningAmount(parseFloat(e.target.value))}
            />
            <Button type="button" onClick={handleAddEarning}>
              Add Earnings
            </Button>
          </div>

          {/* Table to display earnings */}
          <Table>
            <TableCaption>Employees Additional Earnings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Earning Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map out the earnings and display each earning type and amount */}
              {earnings.map((earning, key) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {earning.earningType}
                  </TableCell>
                  <TableCell className="text-right">
                    PHP {earning.value}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEarning(key)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Deductions Table*/}
        {/* TODO: Add a table for deductions that adds a row when Add Row button is clicked */}
        {/* Fields: Deductions, Amount */}
        <div className="p-10 bg-slate-200 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Deductions</h2>

          {/* Form to add deduction type and amount */}

          <div className="flex gap-4 items-center">
            <label htmlFor="">Deduction Type: </label>
            <input
              type="text"
              value={deductionType}
              onChange={(e) => setDeductionType(e.target.value)}
            />
            <label htmlFor="">Value: </label>
            <input
              type="text"
              value={deductionAmount}
              onChange={(e) => setDeductionAmount(parseFloat(e.target.value))}
            />
            <Button type="button" onClick={handleAddDeduction}>
              Add Deductions
            </Button>
          </div>

          {/* Table to display deductions */}
          <Table>
            <TableCaption>Employees Additional Deductions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Deduction Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map out the deductions and display each deduction type and amount */}
              {deductions.map((deduction, key) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {deduction.deductionType}
                  </TableCell>
                  <TableCell className="text-right">
                    PHP {deduction.value}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteDeduction(key)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add a table for earnings and deductions... */}
        <div className="flex gap-4 mt-4">
          <Button type="submit" onClick={() => toast("New Employee Created")}>
            Create
          </Button>

          <Link href="/employees-page">
            <Button>Back to Employees Page</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeePage;

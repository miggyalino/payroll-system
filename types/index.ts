import { DateTime } from "next-auth/providers/kakao";

export type Session = {
  user: {
    username: string;
    role: string;
    id: string;
  };
  token: {
    id: string;
    username: string;
    role: string;
  };
};

export interface User {
  username: string;
  password: string;
  role: string;
}

export interface Earning {
  earningType: string;
  value: number;
}

export interface Deduction {
  deductionType: string;
  value: number;
}

export interface Department {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
  title: string;
  departmentId: string;
}

export type Employee = {
  id: number;
  employeeId: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  contactNumber: string;
  streetAddress: string;
  barangay: string;
  province: string;
  zipCode: string;
  city: string;
  country: string;
  basicPay: number;
  incomeTax: number;
  position: {
    id: number;
    title: string;
    department: {
      id: number;
      name: string;
    };
  };
  status: string;
  user: User;
  earnings: Earning[];
  deductions: Deduction[];
};

export type Payroll = {
  employeeId: number;
  month: string;
  year: number;
  lastName: string;
  firstName: string;
  basicPay: number;
  incomeTax: number;
  totalEarnings: number;
  totalDeductions: number;
  netPay: number;
  position: string;
  department: string;
};

export type DashboardProps = {
  session: Session | null;
  employee: Employee | undefined;
};

export type Leave = {
  id: string;
  startDate: DateTime;
  endDate: DateTime;
  leaveType: String;
  status: String;
  description: String;
  employee: Employee;
};

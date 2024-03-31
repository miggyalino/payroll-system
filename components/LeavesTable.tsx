import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchLeaves } from "@/utils/fetchUtils";
import { Leave } from "@/types";
import { useRouter } from "next/navigation";

const LeavesTable = () => {
  const router = useRouter();
  const approveLeave = async (id: number) => {
    try {
      await fetch(`/api/leaves/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Approved",
        }),
      });
      toast("Approved Leave");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [leaves, setLeaves] = useState<Leave[]>(); // Add Leaves Type in Use State

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeaves();
      setLeaves(data);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8 rounded-lg shadow-lg bg-white p-4 overflow-auto">
      <h2 className="text-2xl font-bold">Leaves</h2>
      <Table>
        <TableCaption>Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves?.map((leave, index) => (
            <TableRow key={index}>
              <TableCell>{leave.employee.employeeId}</TableCell>
              <TableCell>{leave.employee.lastName}</TableCell>
              <TableCell>{leave.employee.firstName}</TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.startDate.split("T")[0]}</TableCell>
              <TableCell>{leave.endDate.split("T")[0]}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                <Button onClick={() => approveLeave(Number(leave.id))}>
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeavesTable;

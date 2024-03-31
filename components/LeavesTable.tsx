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

const LeavesTable = () => {
  const [leaves, setLeaves] = useState<Leave>(); // Add Leaves Type in Use State

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
          <TableRow></TableRow>
          <TableCell>12345</TableCell>
          <TableCell>Alino</TableCell>
          <TableCell>Jose</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>2/7/2012</TableCell>
          <TableCell>2/4/2012</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>
            <Button type="submit">Approve</Button>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default LeavesTable;

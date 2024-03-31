"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Employee } from "@/types";
import { fetchEmployees, getEmployee } from "@/utils/fetchUtils";

type FileLeaveProps = {
  id: number | undefined;
  employeeId: string | undefined;
};

const FileLeave = ({ id, employeeId }: FileLeaveProps) => {
  const [employee, setEmployee] = useState<Employee>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState("");

  // handle leave submission
  const handleSubmitLeave = async () => {
    const leave = await fetch("/api/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: id,
        leaveType,
        startDate,
        endDate,
        status: "Pending",
      }),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getEmployee(id);
        setEmployee(data);
      }
    };

    fetchData();
  }, []);

  return (
    <form action={handleSubmitLeave}>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-bold">
          ID
        </label>
        <input type="text" value={employeeId} disabled />

        <div className="flex gap-2">
          <label htmlFor="" className="font-bold">
            Leave Type:{" "}
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Maternity">Maternity</option>
            <option value="Paternity">Paternity</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="" className="font-bold">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label htmlFor="" className="font-bold">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit">File Leave</Button>
      </div>
    </form>
  );
};

export default FileLeave;

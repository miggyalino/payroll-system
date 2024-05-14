import {
  calculateIncomeTax,
  calculatePagIbig,
  calculatePhilHealth,
  calculateSSS,
  calculateTotalDeductions,
  calculateTotalEarnings,
} from "@/utils/payrollUtils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Employee } from "@/types";

type GeneratePayrollProps = {
  employee: Employee;
};

const GeneratePayroll = ({ employee }: GeneratePayrollProps) => {
  const [startCutoff, setStartCutoff] = useState<Date>();
  const [endCutoff, setEndCutoff] = useState<Date>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await fetch("/api/payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employee.id,
          startDate: startCutoff,
          endDate: endCutoff,
          sss: calculateSSS(employee.basicPay),
          philhealth: calculatePhilHealth(employee.basicPay),
          pagibig: calculatePagIbig(employee.basicPay),
          incomeTax: calculateIncomeTax(employee.basicPay),
          totalEarnings: 0,
          totalDeductions: 0,
          netPay:
            employee.basicPay +
            0 -
            (calculateIncomeTax(employee.basicPay) +
              calculateSSS(employee.basicPay) +
              calculatePhilHealth(employee.basicPay) +
              calculatePagIbig(employee.basicPay) +
              0),
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      toast("Payroll generated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dialog>
        <DialogTrigger>
          <Button type="button">Generate Payslip</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Payslip</DialogTitle>
            <DialogDescription>
              Input the start and end date of the payslip
            </DialogDescription>
          </DialogHeader>
          <Label>Start Cutoff</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !startCutoff && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startCutoff ? (
                  format(startCutoff, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startCutoff}
                onSelect={setStartCutoff}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Label>End Cutoff</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !endCutoff && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endCutoff ? (
                  format(endCutoff, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endCutoff}
                onSelect={setEndCutoff}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button type="submit">Submit</Button>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default GeneratePayroll;

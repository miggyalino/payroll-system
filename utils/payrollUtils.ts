import { Deduction, Earning } from "@/types";
import { Employee } from "@prisma/client";

export const calculateSSS = (grossPay: number) => {
  const sssTable = [
    [1000, 3249.99, 135],
    [3250, 3749.99, 157.5],
    [3750, 4249.99, 180],
    [4250, 4749.99, 202.5],
    [4750, 5249.99, 225],
    [5250, 5749.99, 247.5],
    [5750, 6249.99, 270],
    [6250, 6749.99, 292.5],
    [6750, 7249.99, 315],
    [7250, 7749.99, 337.5],
    [7750, 8249.99, 360],
    [8250, 8749.99, 382.5],
    [8750, 9249.99, 405],
    [9250, 9749.99, 427.5],
    [9750, 10249.99, 450],
    [10250, 10749.99, 472.5],
    [10750, 11249.99, 495],
    [11250, 11749.99, 517.5],
    [11750, 12249.99, 540],
    [12250, 12749.99, 562.5],
    [12750, 13249.99, 585],
    [13250, 13749.99, 607.5],
    [13750, 14249.99, 630],
    [14250, 14749.99, 652.5],
    [14750, 15249.99, 675],
    [15250, 15749.99, 697.5],
    [15750, 16249.99, 720],
    [16250, 16749.99, 742.5],
    [16750, 17249.99, 765],
    [17250, 17749.99, 787.5],
    [17750, 18249.99, 810],
    [18250, 18749.99, 832.5],
    [18750, 19249.99, 855],
    [19250, 19749.99, 877.5],
    [19750, 20249.99, 900],
    [20250, 20749.99, 922.5],
    [20750, 21249.99, 945],
    [21250, 21749.99, 967.5],
    [21750, 22249.99, 990],
    [22250, 22749.99, 1012.5],
    [22270, 23249.99, 1035],
    [23250, 23749.99, 1057.5],
    [23750, 24249.99, 1080],
    [24250, 24279.99, 1102.5],
    [24750, 1125],
  ];

  let sssContribution = 0;
  for (let i = 0; i < sssTable.length; i++) {
    if (i === sssTable.length - 1 && grossPay >= sssTable[i][0]) {
      sssContribution = sssTable[i][1];
      break;
    }
    if (grossPay >= sssTable[i][0] && grossPay <= sssTable[i][1]) {
      sssContribution = sssTable[i][2];
      break;
    }
  }

  return sssContribution;
};

export const calculatePhilHealth = (grossPay: number) => {
  let philHealthContribution = 0;
  if (grossPay <= 10000) {
    philHealthContribution = 450 / 2;
  } else if (grossPay >= 10000.01 && grossPay <= 89999.99) {
    philHealthContribution = (grossPay * 0.05) / 2;
  } else if (grossPay >= 90000) {
    philHealthContribution = 4050;
  }

  return philHealthContribution;
};

export const calculatePagIbig = (grossPay: number) => {
  // Pag-IBIG Contribution
  let pagIbigContribution = 0;
  if (grossPay <= 1500) {
    pagIbigContribution = grossPay * 0.01;
  } else if (grossPay > 1500 && grossPay < 5000) {
    pagIbigContribution = grossPay * 0.02;
  } else if (grossPay >= 5000) {
    pagIbigContribution = 100;
  }

  return pagIbigContribution;
};

export const calculateIncomeTax = (grossPay: number) => {
  // Tax Calculation
  let taxAmount = 0;
  if (grossPay <= 20833) {
    // Tax exempted
    taxAmount = 0;
  } else if (grossPay > 20833 && grossPay <= 33332) {
    // Tax rate 15% for income between 20833 and 33332
    taxAmount = (grossPay - 20833) * 0.15;
  } else if (grossPay > 33332 && grossPay <= 66666) {
    // Tax rate 20% for income between 33333 and 66666
    taxAmount = (grossPay - 33332) * 0.2 + 1875;
  } else if (grossPay > 66666 && grossPay <= 166666) {
    // Tax rate 25% for income between 66667 and 166666
    taxAmount = (grossPay - 66666) * 0.25 + 8541.8;
  } else if (grossPay > 166666 && grossPay <= 666666) {
    // Tax rate 30% for income between 166667 and 666666
    taxAmount = (grossPay - 166666) * 0.3 + 33541.8;
  } else if (grossPay > 666666) {
    // Tax rate 35% for income above 666666
    taxAmount = (grossPay - 666666) * 0.35 + 183541.8;
  }

  return taxAmount;
};

export const calculateTotalAdditionalEarnings = (
  employees: { earnings: number[] }[]
) => {
  let totalAdditionalEarnings = 0;
  employees.forEach((employee) => {
    totalAdditionalEarnings += employee.earnings.reduce(
      (acc, curr) => acc + curr,
      0
    );
  });
  return totalAdditionalEarnings;
};

export const calculateTotalEarnings = (earnings: Earning[]) => {
  return earnings.reduce((acc, curr) => acc + curr.value, 0);
};

export const calculateTotalDeductions = (deductions: Deduction[]) => {
  return deductions.reduce((acc, curr) => acc + curr.value, 0);
};

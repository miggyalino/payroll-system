export const fetchEmployees = async () => {
    const response = await fetch("http://localhost:3000/api/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };

  export const getEmployee = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;

  }

  export const getPayrolls = async () => {
    const response = await fetch(`http://localhost:3000/api/payroll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;

  }

  export const getEarnings = async (id: number) => {
    const response = await fetch(`http://localhost:3000/employees/${id}/earnings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;

  }

  export const getDeductions = async (id: number) => {
    const response = await fetch(`http://localhost:3000/employees/${id}/payroll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;

  }





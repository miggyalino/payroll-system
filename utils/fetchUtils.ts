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
    const response = await fetch(`http://localhost:3000/api/employees/${id}/earnings`, {
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
    const response = await fetch(`http://localhost:3000/api/employees/${id}/deductions`, {
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

  export const fetchSession = async () => {
    const response = await fetch('http://localhost:3000/api/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
  
  export const fetchUserEmployee = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }


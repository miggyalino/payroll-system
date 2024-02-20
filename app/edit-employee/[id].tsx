import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/employees/${id}`);
  const employee = await res.json();

  return {
    props: {
      employee,
    },
  };
};

const EditEmployeePage = ({ employee }) => {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  // Add more state variables for other fields...

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:3000/api/employees/${employee.employeeID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        // Add more fields...
      }),
    });

    if (res.ok) {
      router.push('/employees');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      {/* Add more inputs for other fields... */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditEmployeePage;
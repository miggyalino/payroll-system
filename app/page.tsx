import Image from "next/image";

async function getEmployees() {
  const res = await fetch("/api/getEmployees");
  const data = await res.json();
  return data;
}

export default function Home() {
  return (
    <main>
      
    </main>
  );
}

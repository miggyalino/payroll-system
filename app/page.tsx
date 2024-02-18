const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



export default async function Home() {

  return (
    <main>
      Hello World
    </main>
  );
}


import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from '@/user/types/user';
import { compare, hash } from 'bcrypt';
import { Employee } from '@/employee/types/employee';
import { CreateEmployee } from '@/employee/types/create-employee';

const prismaClient = new PrismaClient();
const ENV = process.env.NODE_ENV;
async function setEmployeeToDB(data: any) {
  try {
    console.log('Setting data to db');
    const employee = await prismaClient.employee.create({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}
async function main() {
  console.log('Envairement: ' + ENV);
  console.log('seeding...');
  const data = await generateData();
  const promises = data.employees.map((data) => setEmployeeToDB(data));

  try {
    const results = await Promise.all(promises);
    console.log('All data has been set to the database');
  } catch (err) {
    console.log('Error setting data to the database:', err);
  }
  console.log('Reading mock data');
}

function generateRigtsOnRole() {
  if (ENV === 'DEV') {
    return [{ right: { create: { name: faker.company.name() } } }];
  }
  return [{ right: { create: { name: 'CanAddNewMembers' } } }];
}
function generateRole() {
  if (process.env.NODE_ENV === 'DEV') {
    return {
      name: faker.person.jobTitle(),
      rights: { create: generateRigtsOnRole() },
    };
  }
  return { name: 'test', rights: { create: generateRigtsOnRole() } };
}
function generateUser(): User {
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const phone = faker.phone.number();
  const email = faker.internet.exampleEmail({
    firstName,
    lastName,
    allowSpecialCharacters: true,
  });
  return { firstName, lastName, middleName, email, phone };
}
async function generateHashedPass() {
  const password = faker.internet.password({
    length: 20,
    memorable: true,
    prefix: 'exemple.',
  });
  return await hash(password, 10);
}
async function generateAdmin() {
  const adminUser: User = {
    firstName: 'Admin',
    middleName: 'Admin',
    lastName: 'Admin',
    email: 'admin@mail.exemple',
    phone: '+380000000',
  };
  const password = await hash('admin.password.dev', 10);
  return {
    user: { create: adminUser },
    password,
    role: {
      create: { name: 'test', rights: { create: generateRigtsOnRole() } },
    },
  };
}
async function generateEmployee() {
  const user = await generateUser();
  const password = await generateHashedPass();
  return {
    user: { create: user },
    password: password,
    role: {
      create: generateRole(),
    },
  };
}
async function generateData() {
  const employees = [await generateAdmin()];
  for (let i = 0; i <= 1; i++) {
    employees.push(await generateEmployee());
  }
  return { employees };
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

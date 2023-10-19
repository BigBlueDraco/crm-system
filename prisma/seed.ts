import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from '@/user/types/user';
import { compare, hash } from 'bcrypt';
import { Employee } from '@/employee/types/employee';
import { CreateEmployee } from '@/employee/types/create-employee';
import { create } from 'domain';

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
  await setEmployeeToDB(data.admin[0]);
  // const empPromises = data.employees.map((data) => setEmployeeToDB(data));
  const custPromises = data.customers.map((data) => setCustomerToDB(data));
  const evntPromises = data.events.map((data) => setEventToDB(data));

  try {
    // await Promise.all(empPromises);
    await Promise.all(custPromises);
    await Promise.all(evntPromises);
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
function generateCustomer() {
  const user = generateUser();
  return {
    user: { create: user },
  };
}
async function generateEvent() {
  const {
    user: { create: user },
    ...cust
  } = generateCustomer();
  return {
    name: 'dasdasd',
    from: new Date(Date.now()).toISOString(),
    to: new Date(Date.now()).toISOString(),
    owner: { create: await generateEmployee() },
    members: {
      create: {
        user: {
          create: {
            ...user,
            customer: { create: cust },
          },
        },
      },
    },
  };
}
async function generateData() {
  const admin = [await generateAdmin()];
  const events = [];
  const employees = [];
  const customers = [];
  if (process.env.NODE_ENV === 'DEV') {
    for (let i = 0; i <= 39; i++) {
      events.push(await generateEvent());
    }
  }
  return { admin, employees, customers, events };
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
async function setCustomerToDB(data: any): Promise<void> {
  try {
    await prismaClient.customer.create({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}
async function setEventToDB(data: any): Promise<void> {
  try {
    await prismaClient.event.create({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}

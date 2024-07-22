import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import {
  Employee,
  Prisma,
  PrismaClient,
  Project,
  Role,
  StatusProject,
  TypeLeave,
  TypeProject,
} from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.timeEntryProject.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.project.deleteMany({});
  let employees: Prisma.Prisma__EmployeeClient<Employee>[] = [];
  for (let i = 0; i < 50; i++) {
    employees.push(
      prisma.employee.create({
        data: {
          id: randomUUID(),
          email: `${faker.internet.email()}`,
          password: bcrypt.hashSync('1234567', 10),
          fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
          role: Role.EMPLOYEE,
          code: `E0000${i}`,
        },
      }),
    );
  }
  employees = (await Promise.all(employees)) as any[];

  const manager = await prisma.employee.create({
    data: {
      id: randomUUID(),
      email: `${faker.internet.email()}`,
      password: bcrypt.hashSync('1234567', 10),
      fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
      role: Role.MANAGER,
      code: `M00001`,
    },
  });
  employees.push(manager as any);

  let projects: Prisma.Prisma__ProjectClient<Project>[] = [];

  for (let i = 0; i < 5; i++) {
    projects.push(
      prisma.project.create({
        data: {
          id: randomUUID(),
          code: 'PROJECT' + i,
          name: `${faker.airline.airport().name} Project`,
          description: 'Project ' + i,
          status: StatusProject.ONGOING,
          type: TypeProject.PROJECT,
          startDate: new Date(),
          endDate: new Date('2030-12-31'),
          typeLeave: null,
          limit: 0,
        },
      }),
    );
  }

  projects.push(
    prisma.project.create({
      data: {
        id: 'abe207db-8d49-4226-bed9-0bb8e4ecb681',
        code: 'VACATION_LEAVE',
        name: 'Nghỉ lễ',
        description: 'Nghỉ lễ',
        status: StatusProject.ONGOING,
        type: TypeProject.LEAVE,
        typeLeave: TypeLeave.VACATION,
        startDate: new Date(),
        endDate: new Date('2030-12-31'),
        limit: 12,
      },
    }),
  );

  projects.push(
    prisma.project.create({
      data: {
        id: '333cb876-88e5-420a-b99e-c6d378e76c19',
        code: 'SICK_LEAVE',
        name: 'Nghỉ bệnh',
        description: 'Nghỉ bệnh',
        status: StatusProject.ONGOING,
        type: TypeProject.LEAVE,
        typeLeave: TypeLeave.SICK,

        startDate: new Date(),
        endDate: new Date('2030-12-31'),
        limit: 12,
      },
    }),
  );

  projects = (await Promise.all(projects)) as any;
  const timeEntries: any[] = [];

  for (const employee of employees) {
    if (faker.helpers.arrayElement([true, false])) {
      for (const project of projects) {
        if ((project as any).type !== TypeProject.LEAVE) {
          if (faker.helpers.arrayElement([true, false])) {
            timeEntries.push(
              prisma.timeEntryProject.create({
                data: {
                  id: randomUUID(),
                  employeeId: (employee as any).id,
                  projectId: (project as any).id,
                  date: faker.date.between({
                    from: '2024-01-01T00:00:00.000Z',
                    to: '2024-12-31T00:00:00.000Z',
                  }),
                  hours: faker.helpers.arrayElement([4, 8]),
                  overtime: faker.helpers.arrayElement([4, 8]),
                },
              }),
            );
          }
        }
      }
    } else {
      for (const employee of employees) {
        if (faker.helpers.arrayElement([true, false])) {
          for (const project of projects) {
            if ((project as any).type !== TypeProject.LEAVE) {
              if (faker.helpers.arrayElement([true, false])) {
                timeEntries.push(
                  prisma.timeEntryProject.create({
                    data: {
                      id: randomUUID(),
                      employeeId: (employee as any).id,
                      projectId: (project as any).id,
                      date: faker.date.between({
                        from: '2024-01-01T00:00:00.000Z',
                        to: '2024-12-31T00:00:00.000Z',
                      }),
                      hours: faker.helpers.arrayElement([4, 8]),
                      overtime: faker.helpers.arrayElement([4, 8]),
                    },
                  }),
                );
              }
            }
          }
        }
      }
    }
  }
  await Promise.all(timeEntries);
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});

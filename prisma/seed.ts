import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import {
  PrismaClient,
  Role,
  StatusProject,
  TypeLeave,
  TypeProject,
} from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.timeEntryProject.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.project.deleteMany({});
  const employee = await prisma.employee.create({
    data: {
      id: 'c4eb379f-4ddb-4e7a-a39f-d7a94fe361d8',
      email: 'nthinh.dev@gmail.com',
      password: bcrypt.hashSync('1234567', 10),
      fullname: 'Nguyen Thanh Hinh',
      role: Role.MANAGER,
      code: 'M00001',
    },
  });
  const project = await prisma.project.create({
    data: {
      id: 'a55f1355-6801-4704-ba61-e8e35130327f',
      code: 'CYBERSOFT',
      name: 'CyberSoft',
      description: 'CyberSoft',
      status: StatusProject.ONGOING,
      type: TypeProject.PROJECT,
      typeLeave: null,
      limit: 0,
    },
  });
  await prisma.project.create({
    data: {
      id: 'abe207db-8d49-4226-bed9-0bb8e4ecb681',
      code: 'VACATION_LEAVE',
      name: 'Nghỉ lễ',
      description: 'Nghỉ lễ',
      status: StatusProject.ONGOING,
      type: TypeProject.LEAVE,
      typeLeave: TypeLeave.VACATION,
      limit: 12,
    },
  });

  await prisma.project.create({
    data: {
      id: '333cb876-88e5-420a-b99e-c6d378e76c19',
      code: 'SICK_LEAVE',
      name: 'Nghỉ bệnh',
      description: 'Nghỉ bệnh',
      status: StatusProject.ONGOING,
      type: TypeProject.LEAVE,
      typeLeave: TypeLeave.SICK,
      limit: 12,
    },
  });

  await prisma.project.create({
    data: {
      id: '94d509d7-f976-4306-a2b4-7fb9c8a57751',
      code: 'OVER_TIME',
      name: 'Over time',
      description: 'Over time',
      status: StatusProject.ONGOING,
      type: TypeProject.OVERTIME,
      limit: 0,
    },
  });

  const timeEntry = await prisma.timeEntryProject.create({
    data: {
      id: 'f2c9b6a8-9e3c-4e8a-8b0d-2c7b3e5e3e3b',
      hours: 8,
      employeeId: employee.id,
      projectId: project.id,
    },
  });
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});

import fs from 'fs';
import readline from 'readline';
import pLimit from 'p-limit';
import { PrismaClient } from '@prisma/client';
import HttpException from '../app/models/http-exception.model';
import { addStaff } from '../app/routes/staff/staff.service';
import { StaffInput } from '../app/routes/staff/staff.model';

const prisma = new PrismaClient();

const createStaffTeam = async (input: StaffInput) => {
  try {
    return await addStaff(input);
  } catch (error) {
    if (error instanceof HttpException) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

const addStaffFromLine = async (line: string) => {
  const [staffPassId, teamName, createdAt] = line.split(',');
  const [role, staffId] = staffPassId.split("_");
  await createStaffTeam({
    staffId,
    role,
    teamName,
    createdAt: parseInt(createdAt),
  });
};

const addStaffFromCSVFile = async (csvFilePath: string) => {
  const data = fs.readFileSync(csvFilePath).toString();
  const lines = data.split("\n");
  for(let i = 1; i < lines.length; i++) {
    await addStaffFromLine(lines[i]);
  }
};

const main = async () => {
  try {
    const csvFilePath = 'data/staff-id-to-team-mapping-long.csv';
    await addStaffFromCSVFile(csvFilePath);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

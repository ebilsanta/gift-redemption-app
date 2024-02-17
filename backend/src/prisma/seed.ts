import fs from 'fs';
import readline from 'readline';
import { PrismaClient } from '@prisma/client';
import HttpException from '../app/models/http-exception.model';
import { addStaffToTeam } from '../app/routes/team/team.service';
import { StaffTeamInput } from '../app/routes/team/staff-team.model';

const prisma = new PrismaClient();

const createStaffTeam = async (input: StaffTeamInput) => {
  try {
    return await addStaffToTeam(input);
  } catch (error) {
    if (error instanceof HttpException) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

const addStaffTeamFromLine = async (line: string) => {
  const [staffPassId, teamName, createdAt] = line.split(',');
  await createStaffTeam({
    staffPassId,
    teamName,
    createdAt: parseInt(createdAt),
  });
};

const addStaffTeamFromCSVFile = async (csvFilePath: string) => {
  const readStream = fs.createReadStream(csvFilePath);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  rl.on('line', async (line: string) => {
    try {
      await addStaffTeamFromLine(line);
    } catch (error) {
      console.error('Error processing line:', error);
    }
  });

  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

  rl.on('close', () => {
    console.log('CSV file processing completed.');
    readStream.close();
    rl.close();
  });
};

const main = async () => {
  try {
    const csvFilePath = 'data/staff-id-to-team-mapping-long.csv';
    await addStaffTeamFromCSVFile(csvFilePath);
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

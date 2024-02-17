import prisma from '../../../prisma/prisma-client';
import HttpException from '../../models/http-exception.model';
import staffTeamMapper from './staff-team.mapper';
import { StaffTeamInput } from './staff-team.model';

export const addStaffToTeam = async (input: StaffTeamInput) => {
  const staffTeamCount = await prisma.staffTeam.count({
    where: {
      staffPassId: input.staffPassId,
    }
  });
  
  if (staffTeamCount != 0) {
    throw new HttpException(422, { errors: { staffPassId: [`${input.staffPassId} already exists`] } });
  }

  const createdStaffTeam = await prisma.staffTeam.create({
    data: {
      staffPassId: input.staffPassId,
      teamName: input.teamName,
      createdAt: new Date(input.createdAt),
    },
  });

  return staffTeamMapper(createdStaffTeam);
}
import prisma from '../../../prisma/prisma-client';
import HttpException from '../../models/http-exception.model';
import staffMapper from './staff.mapper';
import { StaffInput } from './staff.model';

export const getStaff = async (query: any) => {
  const allStaff = await prisma.staff.findMany({
    where: {
      staffPassId: {
        startsWith: query.prefix,
      },
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
  });
  return allStaff.map((staff: any) => staffMapper(staff));
}

export const addStaff = async (input: StaffInput) => {
  const staffTeamCount = await prisma.staff.count({
    where: {
      staffPassId: input.staffPassId,
    }
  });
  
  if (staffTeamCount != 0) {
    throw new HttpException(422, { errors: { staffPassId: [`${input.staffPassId} already exists`] } });
  }
  
  const createdStaffTeam = await prisma.staff.create({
    data: {
      staffPassId: input.staffPassId,
      teamName: input.teamName,
      createdAt: new Date(input.createdAt),
    },
  });

  return staffMapper(createdStaffTeam);
}
import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import HttpException from '../../models/http-exception.model';
import { staffMapper, staffRedemptionMapper } from './staff.mapper';
import { StaffInput } from './staff.model';

const buildPrismaGetQuery = (query: any) => {
  const prismaQuery: Prisma.StaffFindManyArgs = {
    where: {
      staffPassId: {
        startsWith: query.prefix,
      },
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
  };

  return prismaQuery;
};

export const getStaff = async (query: any) => {
  if (query.include_redeemed === 'true') {
    const offset = Number(query.offset) || 0;
    const limit = Number(query.limit) || 10;
    const prefix = `${query.prefix}%`;
    const allStaffWithRedeemedAt = await prisma.$queryRaw<[]>`
      SELECT s.id, s.staff_pass_id, s.team_name, r.redeemed_at, s.created_at
      FROM Staff s
      LEFT JOIN Redemption r ON s.team_name = r.team_name
      WHERE s.staff_pass_id LIKE ${prefix}
      LIMIT ${limit}
      OFFSET ${offset};
    `;
    
    return allStaffWithRedeemedAt.map((staff) => staffRedemptionMapper(staff));
  }
  const prismaQuery = buildPrismaGetQuery(query);
  const allStaff = await prisma.staff.findMany(prismaQuery);
  return allStaff.map((staff) => staffMapper(staff));
};

export const addStaff = async (input: StaffInput) => {
  const staffCount = await prisma.staff.count({
    where: {
      staffPassId: input.staffPassId,
    },
  });

  if (staffCount !== 0) {
    throw new HttpException(422, {
      error: { message: `staff ${input.staffPassId} already exists` },
    });
  }

  const createdStaff = await prisma.staff.create({
    data: {
      staffPassId: input.staffPassId,
      teamName: input.teamName,
      createdAt: new Date(input.createdAt),
    },
  });

  return staffMapper(createdStaff);
};

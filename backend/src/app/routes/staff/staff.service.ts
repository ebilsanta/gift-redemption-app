import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import HttpException from '../../models/http-exception.model';
import { staffMapper, staffRedemptionMapper } from './staff.mapper';
import { StaffInput } from './staff.model';

export const buildPrismaGetQuery = (query: any) => {
  const prismaQuery: Prisma.StaffFindManyArgs = {
    where: {
      OR: [
        {
          role: {
            role: {
              startsWith: query.prefix,
            },
          },
        },
        {
          staffId: {
            startsWith: query.prefix,
          },
        },
      ],
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
      SELECT s.id, s.staff_id, s.team_name, ro.role, re.redeemed_at, s.created_at
      FROM staff s
      LEFT JOIN redemption re ON s.team_name = re.team_name
      LEFT JOIN role ro on s.role_id = ro.id 
      WHERE s.staff_id LIKE ${prefix}
      OR ro.role LIKE ${prefix}
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
      staffId: input.staffId,
    },
  });

  if (staffCount !== 0) {
    throw new HttpException(422, {
      error: { message: `staff ${input.staffId} already exists` },
    });
  }

  let role = await prisma.role.findFirst({
    where: {
      role: input.role,
    },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        role: input.role,
      },
    });
  }

  const createdStaff = await prisma.staff.create({
    data: {
      staffId: input.staffId,
      roleId: role.id,
      teamName: input.teamName,
      createdAt: new Date(input.createdAt),
    },
    include: {
      role: true,
    },
  });

  return staffMapper(createdStaff);
};

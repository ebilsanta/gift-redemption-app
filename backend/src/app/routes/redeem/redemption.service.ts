import prisma from '../../../prisma/prisma-client';
import HttpException from '../../models/http-exception.model';
import redemptionMapper from './redemption.mapper';

export const createRedemption = async (body: any) => {
  const { staffPassId } = body;

  if (!staffPassId) {
    throw new HttpException(422, { error: { message: "staffPassId can't be blank" } });
  }

  const staff = await prisma.staff.findUnique({
    where: {
      staffPassId: staffPassId,
    },
  });

  if (!staff) {
    throw new HttpException(422, { error: { message: `staff ${staffPassId} does not exist` } });
  }

  const redemptionCount = await prisma.redemption.count({
    where: {
      teamName: staff.teamName,
    },
  });

  if (redemptionCount !== 0) {
    throw new HttpException(409, { error: { message: `team ${staff.teamName} has already redeemed their gift` } });
  }

  const redemption = await prisma.redemption.create({
    data: {
      teamName: staff.teamName,
      redeemedAt: new Date(),
    },
  });

  return redemptionMapper(redemption);
}
import { Prisma } from '@prisma/client';

const redemptionMapper = (
  redemption: Prisma.RedemptionGetPayload<Prisma.RedemptionArgs>
) => ({
  id: redemption.id,
  teamName: redemption.teamName,
  redeemedAt: redemption.redeemedAt.getTime(),
});

export default redemptionMapper;

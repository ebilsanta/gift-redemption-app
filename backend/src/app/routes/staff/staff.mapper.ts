import { Prisma } from '@prisma/client';
import { StaffWithRedeemedAt } from './staff.model';

export const staffMapper = (
  staff: Prisma.StaffGetPayload<Prisma.StaffArgs>
) => ({
  id: staff.id,
  staffPassId: staff.staffPassId,
  teamName: staff.teamName,
  createdAt: staff.createdAt.getTime(),
});

export const staffRedemptionMapper = (staff: StaffWithRedeemedAt) => ({
  id: staff.id,
  staffPassId: staff.staff_pass_id,
  teamName: staff.team_name,
  redeemedAt: staff.redeemed_at ? staff.redeemed_at.getTime() : null,
  createdAt: staff.created_at.getTime(),
});

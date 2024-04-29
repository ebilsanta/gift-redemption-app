import { Prisma } from '@prisma/client';
import { StaffWithRedeemedAt } from './staff.model';

export const staffMapper = (
  staff: Prisma.StaffGetPayload<Prisma.StaffArgs>
) => ({
  id: staff.id,
  staffPassId: staff.staffId,
  role: staff.roleId,
  teamName: staff.teamName,
  createdAt: staff.createdAt.getTime(),
});

export const staffRedemptionMapper = (staff: StaffWithRedeemedAt) => ({
  id: staff.id,
  staffPassId: staff.staff_id,
  role: staff.role,
  teamName: staff.team_name,
  redeemedAt: staff.redeemed_at ? staff.redeemed_at.getTime() : null,
  createdAt: staff.created_at.getTime(),
});

export interface StaffInput {
  staffPassId: string;
  teamName: string;
  createdAt: number;
};

export interface StaffWithRedeemedAt {
  id: number;
  staff_pass_id: string;
  team_name: string;
  redeemed_at: Date | null;
  created_at: Date;
};

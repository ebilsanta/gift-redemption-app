export interface StaffInput {
  staffId: string;
  role: string;
  teamName: string;
  createdAt: number;
};

export interface StaffWithRedeemedAt {
  id: number;
  staff_id: string;
  team_name: string;
  role: string;
  redeemed_at: Date | null;
  created_at: Date;
};

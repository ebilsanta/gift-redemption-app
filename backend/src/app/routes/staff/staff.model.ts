export interface StaffInput {
  staffPassId: string;
  teamName: string;
  createdAt: number;  
}

export interface StaffTeam extends StaffInput {
    id: number;
}


export interface StaffTeamInput {
  staffPassId: string;
  teamName: string;
  createdAt: number;  
}

export interface StaffTeam extends StaffTeamInput {
    id: number;
}


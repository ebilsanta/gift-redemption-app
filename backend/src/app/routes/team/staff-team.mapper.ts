const staffTeamMapper = (staffTeam: any) => ({
  id: staffTeam.id,
  staffPassId: staffTeam.staffPassId,
  teamName: staffTeam.teamName,
  createdAt: staffTeam.createdAt.getTime(),
})

export default staffTeamMapper;
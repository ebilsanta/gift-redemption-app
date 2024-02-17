const redemptionMapper = (redemption: any) => ({
  teamName: redemption.teamName,
  redeemedAt: redemption.redeemedAt.getTime(),
})

export default redemptionMapper;
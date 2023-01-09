export type TeamStepData = {
  gamesStatus: string;
  region: string;
  competitionId: number;
  competitionName: string;
  gameId: number;
  eSport: boolean;
  sportTypeAlias: string;
  sportType: string;
  gameDate: number;
  name: string;
  team1_name: string;
  team2_name: string;
}

export type MarketStepData = {
  marketName: string;
  eventName: string;
  marketGroupName: string;
  marketGroupId: string;
  marketId: string;
  eventId: string;
}

export type BetFlowData = {
  team_name: string,
  competition: TeamStepData,
  market: MarketStepData,
  subMarket: string,
  event: string,
  eventBase: string,
  confirmDetails: string,
  amount: string,
  gameRegion: string,
  gameId: string,
  competitionId: string,
  eventId: string,
  marketId: string
}

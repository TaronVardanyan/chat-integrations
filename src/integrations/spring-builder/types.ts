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
  marketType: string;
  marketName: string;
  marketId: number;
  marketGroupName: string;
  marketGroupId: number;
  eventName: string;
  coeficient: number;
  eventId: number;
  expressId: number;
  gameDate: number;
  competitionName: string;
  gameName: string;
  isLive: boolean;
  sportName: string;
  sportAlias: string;
  gameId: number;
  region: string;
  competitionId: number;
  team1: string;
  team2: string;
}

export type ConfirmStepData = {
  status: string;
  message: string;
}

export type LoginStepData = {
  auth_token: string;
  user_id: number;
  qr_code_origin?: any;
  jwe_token: string;
  username: string;
  email: string;
  status: string;
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

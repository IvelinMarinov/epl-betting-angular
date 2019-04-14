import { Team } from './Team';

export interface GameStat {
    _id :string,
    homeTeamId :string,
    homeTeam :Team,
    awayTeamId :string,
    awayTeam :Team
}
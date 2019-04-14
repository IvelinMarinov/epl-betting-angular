import { Team } from './Team';

export interface GameStat {
    _id: string,
    homeTeamId: string,
    homeTeam: Team,
    homeTeamGoals: number,
    awayTeamId: string,
    awayTeam: Team
    awayTeamGoals: number
}
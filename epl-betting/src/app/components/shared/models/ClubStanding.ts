import { Team } from './Team';

export interface ClubStanding {
    _id: string,
    team: Team,
    gamesPlayed: number,
    wins: number,
    draws: number,
    losses: number,
    goalsConceded: number,
    goalsScored: number,
    goalDifference: number,
    points: number
}
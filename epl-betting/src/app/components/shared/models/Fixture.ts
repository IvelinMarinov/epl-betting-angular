import { GameStat } from './GameStat';

export interface Fixture {
    _id :string,
    betsAcceptedBy :Date,
    isActive :boolean,
    isCompleted :boolean,
    round :number,
    gameStats :Array<GameStat>
}
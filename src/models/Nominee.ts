export interface NomineeCreateModel {
  tournamentName: string;
  tournamentWinner: string;
  imageSource: string;
  lastUpdateDate?: Date;
}

export interface NomineeModel extends NomineeCreateModel {
  id: number;
  points: number;
  lastVotedDate?: Date;
}
export interface NomineeCreateModel {
  tournamentName: string;
  tournamentWinner: string;
  imageSource: string;
}

export interface NomineeModel extends NomineeCreateModel {
  points: number;
  lastVotedDate?: Date;
  lastUpdateDate: Date;
  id: number;
}
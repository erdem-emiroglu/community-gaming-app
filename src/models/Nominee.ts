export interface NomineeCreateModel {
  tournamentName: string;
  lastUpdateDate?: Date;
  tournamentWinner?: string;
  imageSource?: string;
}

export interface NomineeModel extends NomineeCreateModel {
  id: number;
  points: number;
  lastVotedDate?: Date;
}

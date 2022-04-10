export interface NomineeCardProps {
  tournamentName: string;
  imageSource?: string;
  tournamentWinner: string;
  lastVotedDate?: Date;
  points?: number;
  id: number;
  onUpvote: () => void;
  onDownvote: () => void;
  onDelete: () => void;
}

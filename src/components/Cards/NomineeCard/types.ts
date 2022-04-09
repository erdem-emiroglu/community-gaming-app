export interface NomineeCardProps {
  tournamentName: string;
  imageSource?: string;
  tournamentWinner?: string;
  lastVotedDate?: Date;
  points?: number;
  id: number;
  voteStatus: string | null;
  onUpvote: () => void;
  onDownvote: () => void;
  onDelete: () => void;
}

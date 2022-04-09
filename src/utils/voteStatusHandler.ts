import { StorageHelper } from "helpers/storageHelper";
import { LastVoteStatusType, VoteType } from "helpers/typeHelper";

export const handleVoteStatus = (
  lastVoteStatus: LastVoteStatusType | null,
  voteType: VoteType,
  votePoints: number,
  nomineeId: number
) => {
  const storageHelper = new StorageHelper();
  let currentVotePoints = votePoints;

  //never voted before
  if (lastVoteStatus == null) {
    if (voteType === "downvote") {
      currentVotePoints--;
    }
    if (voteType === "upvote") {
      currentVotePoints++;
    }
    storageHelper.setLastVoteStatus(nomineeId, `${voteType}d`);
  }

  if (lastVoteStatus === "downvoted") {
    // take back downvote
    if (voteType === "downvote") {
      currentVotePoints++;
      storageHelper.removeLastVoteStatus(nomineeId);
    }
    // take back downvote then upvote
    if (voteType === "upvote") {
      currentVotePoints += 2;
      storageHelper.setLastVoteStatus(nomineeId, `${voteType}d`);
    }
  }

  if (lastVoteStatus === "upvoted") {
    // take back upvote
    if (voteType === "upvote") {
      currentVotePoints--;
      storageHelper.removeLastVoteStatus(nomineeId);
    }
    // take back upvote then downvote
    if (voteType === "downvote") {
      currentVotePoints -= 2;
      storageHelper.setLastVoteStatus(nomineeId, `${voteType}d`);
    }
  }

  return currentVotePoints;
};

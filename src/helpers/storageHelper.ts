import { LastVoteStatusType } from "./typeHelper";

export class StorageHelper {
  public getLastVoteStatus(nomineeId: number): LastVoteStatusType | null {
    return localStorage.getItem(`nominee_${nomineeId}_vote_status`) as LastVoteStatusType;
  }

  public setLastVoteStatus(nomineeId: number, status: LastVoteStatusType) {
    return localStorage.setItem(`nominee_${nomineeId}_vote_status`, status);
  }

  public removeLastVoteStatus(nomineeId: number) {
    return localStorage.removeItem(`nominee_${nomineeId}_vote_status`);
  }
}

import { NomineeCreateModel, NomineeModel } from "models/Nominee";
import { createId } from "utils/createId";
import { StorageHelper } from "./storageHelper";
import { FilterType, VoteType } from "./typeHelper";

export class NomineeHelper {
  nominees: NomineeModel[];
  setNominees: (nominees: NomineeModel[]) => void;

  storageHelper = new StorageHelper();
  storedNominees = this.storageHelper.getNominees();

  constructor(
    nominees: NomineeModel[],
    setNominees: (nominees: NomineeModel[]) => void
  ) {
    this.nominees = nominees;
    this.setNominees = setNominees;
  }

  private handleVote(upvotedNominee: NomineeModel, type: VoteType) {
    const currentDate = new Date();
    let newNomineePoints = upvotedNominee.points;

    if (type === "downvote") {
      newNomineePoints--;
    }

    if (type === "upvote") {
      newNomineePoints++;
    }

    const nomineeData = this.nominees.map((nominee) => {
      if (nominee.tournamentName === upvotedNominee.tournamentName) {
        return {
          ...nominee,
          points: newNomineePoints,
          lastUpdateDate: currentDate,
          lastVotedDate: currentDate,
        };
      }
      return nominee;
    });

    this.setNominees(nomineeData);
    this.storageHelper.setNominees(nomineeData);
  }

  private sort(nominees: NomineeModel[], type?: FilterType) {
    const nomineeData = [...nominees];

    if (type == null) {
      nomineeData.sort((firstNominee, secondNominee) => {
        return new Date(firstNominee.lastUpdateDate).getTime() -
          new Date(secondNominee.lastUpdateDate).getTime() >
          0
          ? -1
          : 1;
      });
    }

    nomineeData.sort((firstNominee, secondNominee) => {
      if (firstNominee.points === secondNominee.points) {
        return new Date(firstNominee.lastUpdateDate).getTime() -
          new Date(secondNominee.lastUpdateDate).getTime() >
          0
          ? -1
          : 1;
      }

      if (type === "ascending") {
        return firstNominee.points - secondNominee.points > 0 ? 1 : -1;
      }

      if (type === "descending") {
        return firstNominee.points - secondNominee.points > 0 ? -1 : 1;
      }

      return 0;
    });

    this.setNominees(nomineeData);
    return nomineeData;
  }

  public get(filter?: FilterType) {
    const nominees = this.storageHelper.getNominees();
    const totalPage = Math.ceil(nominees.length / 6);
    const sortedNominees = this.sort(nominees, filter);
    return {
      data: sortedNominees,
      totalPage: totalPage,
    };
  }

  public create(newNominee: NomineeCreateModel) {
    const currentDate = new Date();
    const id = createId(this.nominees);

    const initialData = { lastUpdateDate: currentDate, points: 0, id };
    const nomineeData = [
      ...this.storedNominees,
      { ...newNominee, ...initialData },
    ];

    this.setNominees(nomineeData);
    this.storageHelper.setNominees(nomineeData);
  }

  public delete(deletedNominee: NomineeModel) {
    const storedNomineeData = this.storedNominees.filter(
      (nominee) => nominee.id !== deletedNominee.id
    );

    const nomineeData = this.nominees.filter(
      (nominee) => nominee.id !== deletedNominee.id
    );

    this.setNominees(nomineeData);
    this.storageHelper.setNominees(storedNomineeData);
  }

  public upvote(upvotedNominee: NomineeModel) {
    this.handleVote(upvotedNominee, "upvote");
  }

  public downvote(upvotedNominee: NomineeModel) {
    this.handleVote(upvotedNominee, "downvote");
  }

  public sortByDescending(nominees: NomineeModel[]) {
    this.sort(nominees, "descending");
  }

  public sortByAscending(nominees: NomineeModel[]) {
    this.sort(nominees, "ascending");
  }
}

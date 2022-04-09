import { NomineeCreateModel, NomineeModel } from "models/Nominee";
import { api } from "../api";

const NOMINEE_PREFIX = "/nominees";
type Points = {
  points: number;
};

export class NomineeAPIService {
  static get(
    page?: number,
    parameter?: string
  ): Promise<{ data: NomineeModel[]; totalPage: number }> {
    return api
      .get(`${NOMINEE_PREFIX}?_page=${page || 1}&_limit=6${parameter ?? ""}`)
      .then((response) => ({
        totalPage: Math.ceil(parseInt(response.headers["x-total-count"]) / 6),
        data: response.data,
      }));
  }

  static create(newNominee: NomineeCreateModel): Promise<NomineeModel> {
    const creationDate = new Date();
    const points = 0;
    return api
      .post(NOMINEE_PREFIX, {
        ...newNominee,
        lastUpdateDate: creationDate,
        points,
      })
      .then((response) => response.data);
  }

  static delete(id: number): Promise<NomineeModel> {
    return api.delete(`${NOMINEE_PREFIX}/${id}`);
  }

  static updatePoints(id: number, points: number): Promise<Points> {
    const lastVotedDate = new Date();
    return api.patch(`${NOMINEE_PREFIX}/${id}`, {
      points,
      lastVotedDate,
      lastUpdateDate: lastVotedDate,
    });
  }
}

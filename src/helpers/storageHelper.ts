import { NomineeModel } from "models/Nominee";

export class StorageHelper {
  public getNominees():NomineeModel[] {
    const data = localStorage.getItem("nominees");

    if (data == null) return [];

    return JSON.parse(data);
  }

  public setNominees(nominees: NomineeModel[]) {
    const data = JSON.stringify(nominees);

    localStorage.setItem("nominees", data);
  }
}

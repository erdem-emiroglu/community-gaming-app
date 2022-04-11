import { NomineeModel } from "models/Nominee";
import { createContext, useContext } from "react";

export type NomineeContextType = {
  nominees: NomineeModel[];
  setNominees: (nominees: NomineeModel[]) => void;
};

export const NomineeContext = createContext<NomineeContextType>({
  nominees: [],
  setNominees: () => {},
});
export const useNominee = () => useContext(NomineeContext);

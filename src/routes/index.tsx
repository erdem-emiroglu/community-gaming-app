import { Routes as RouteProvider, Route, Navigate } from "react-router-dom";
import { NewNominee } from "pages/NewNominee";
import { Nominees } from "pages/Nominees";

export const Routes = () => (
  <RouteProvider>
    <Route path="*" element={<Navigate to="/nominee" replace />} />
    <Route path="/nominee" element={<Nominees />} />
    <Route path="/nominee/new" element={<NewNominee />} />
  </RouteProvider>
);

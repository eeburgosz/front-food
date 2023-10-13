import React, { useEffect } from 'react';
import { AppRoutes } from "./routes/AppRoutes";
import { getAllRecipes } from "./redux-toolkit/thunks";
import { useDispatch } from "react-redux";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

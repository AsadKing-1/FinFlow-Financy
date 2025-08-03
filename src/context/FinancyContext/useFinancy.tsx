import { useContext } from "react";
import { FinancyContext } from "../contexts/context";


export const useFinancy = () => {
  const context = useContext(FinancyContext);
  if (!context) throw new Error("useFinancy должен быть внутри FinancyProvider");
  return context;
};
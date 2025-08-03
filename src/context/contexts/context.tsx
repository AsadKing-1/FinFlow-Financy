import type { TransactionData } from "../../components/types/types-const";
import { createContext } from "react";

export interface FinancyContextType {
    transactions: TransactionData[];
    addTransaction: (t: TransactionData) => void;
    deleteTransaction: (id?: number) => void;
    incomeTotal: number;
    expenseTotal: number;
}


export const FinancyContext = createContext<FinancyContextType>({
    transactions: [],
    addTransaction: () => { },
    deleteTransaction: () => { },
    incomeTotal: 0,
    expenseTotal: 0,
});
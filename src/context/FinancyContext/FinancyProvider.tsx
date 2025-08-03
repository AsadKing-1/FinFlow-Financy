import type { TransactionData, } from "../../components/types/types-const";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { FinancyContext } from "../contexts/context";



export const FinancyProvider = ({ children }: { children: ReactNode }) => {

    const loadTransactionsFromLocalStorage = (): TransactionData[] => {
        const data = localStorage.getItem("transactions");
        return data ? JSON.parse(data) : [];
    }
    const saveTransactionsToLocalStorage = (transactions: TransactionData[]) => {
        localStorage.setItem("transactions", JSON.stringify(transactions))
    }
    const [transactions, setTransactions] = useState<TransactionData[]>(loadTransactionsFromLocalStorage);

    useEffect(() => {
        saveTransactionsToLocalStorage(transactions)
    }, [transactions]);

    const addTransaction = (t: TransactionData) => {
        const newTransaction = { ...t, id: Date.now(), date: new Date().toISOString() };
        setTransactions((prev) => [...prev, newTransaction]);
    };

    const deleteTransaction = (id?: number) => {
        if (!id) return;
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const incomeTotal = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expenseTotal = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return (
        <FinancyContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                incomeTotal,
                expenseTotal,
            }}>

            {children}
        </FinancyContext.Provider>
    )
} 

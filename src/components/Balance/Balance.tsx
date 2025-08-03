import "./Balance.css";

import { useFinancy } from "../../context/FinancyContext/useFinancy";

export default function Balance() {
    const { incomeTotal, expenseTotal } = useFinancy();


    return (
        <div className="dashboard">
            <div className="balance-budget-container">
                <div className="glass-card balance-card">
                    <div className="card-header">
                        <span className="card-title">Overall balance</span>
                        <svg className="card-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <div className="balance-amount" id="totalBalance">₽{Math.round(incomeTotal - expenseTotal)}</div>
                </div>
            </div>

            <div className="glass-card stats">
                <div className="card-header">
                    <span className="card-title">Statistics</span>
                    <svg className="card-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-7h7v7zm2-10H7V5h9v2z" />
                    </svg>
                </div>
                <div className="stats-grid">
                    <div className="stat-item income-stat">
                        <div className="stat-value" id="totalIncome">₽+{Math.round(incomeTotal)}</div>
                        <div className="stat-label">Income</div>
                    </div>
                    <div className="stat-item expense-stat">
                        <div className="stat-value" id="totalExpenses">₽-{Math.round(expenseTotal)}</div>
                        <div className="stat-label">expense</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

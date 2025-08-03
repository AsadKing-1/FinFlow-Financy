import Header from "../components/header/header";
import Daily from "../components/daily-words/daily";
import Balance from "../components/Balance/Balance";
import Transaction from "../components/transaction/transaction";
import { FinancyProvider } from "../context/FinancyContext/FinancyProvider";


import "./main.css";

function Main() {
  return (
    <FinancyProvider>
      <div className="container">
        <Header />
        <Daily />
        <Balance />
        <Transaction />
      </div>
    </FinancyProvider>
  )
}

export default Main;
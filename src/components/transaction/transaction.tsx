import { useState, useEffect, useRef } from "react";
import { useFinancy } from "../../context/FinancyContext/useFinancy";
import type { Option } from "../types/types-const";
import { options, categoryIcons, optionsType } from "../types/types-const";

import "./transaction.css";
import "./dropdown.css";

interface DropdownProps {
  onSelect: (option: Option) => void;
  selected?: Option | null;
  options: Option[];
};

const Dropdown: React.FC<DropdownProps> = ({ onSelect, selected = null, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option: Option) => {
    onSelect(option)
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="cool-dropdown" ref={dropdownRef}>
      <div
        className={`cool-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <span className="icon">{selected?.icon}</span>
        <span className={`text ${!selected ? 'placeholder' : ''}`}>
          {selected?.label || 'Select Category'}
        </span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="cool-dropdown-menu">
          {options.map(opt => (
            <div
              key={opt.value}
              className={`cool-dropdown-item ${selected?.value === opt.value ? 'selected' : ''
                }`}
              onClick={() => handleSelect(opt)}
            >
              <span className="icon">{opt.icon}</span>
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Transaction() {

  const { transactions, addTransaction, deleteTransaction } = useFinancy();
  const [isOpen, setOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    id: Date.now(),
    description: "",
    amount: "",
    type: "",
    category: "",
  });
  const handleCategorySelect = (selectedOption: Option) => {
    setTransaction((prev) => ({
      ...prev, category: selectedOption.value
    }));
  };
  const selectCategory = options.find((opt) => opt.value === transaction.category) || null;
  const handleTypeSelect = (selectedOption: Option) => {
    setTransaction((prev) => ({ ...prev, type: selectedOption.value }));
  };
  const selectType = optionsType.find((opt) => opt.value === transaction.type) || null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addTransaction(transaction);
    setTransaction({
      id: Date.now(),
      description: "",
      amount: "",
      type: "",
      category: "",
    });

    setOpen(false);
  };

  const [filtredTransaction, setFiltredTransaction] = useState<string>("");



  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((tx) =>
    tx.description.toLowerCase().includes(filtredTransaction.toLowerCase()) &&
    (filterCategory === null || tx.category === filterCategory)
  );



  return (
    <section className="transactions-section">
      <div className="section-header">
        <h2 className="section-title">Transactions</h2>
        <div className="container-buttons">
          <button
            onClick={() => setOpen(!isOpen)}
            className="add-transaction-btn"
          >
            +
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" onChange={(e) => { setFiltredTransaction(e.target.value) }} className="search-input" placeholder="Search Transaction ....." />
        <svg className="search-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
      </div>

      <div className="filter-tags">
        <span className={`filter-tag ${filterCategory === null ? "active" : ""}`} onClick={() => setFilterCategory(null)}> All </span>

        {["food", "transport", "entertainment", "bills", "shopping", "health", "education","salary" ].map((cat) => (
          <span
            key={cat}
            className={`filter-tag ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {categoryIcons[cat as keyof typeof categoryIcons]} {cat}
          </span>
        ))}
      </div>


      <form
        style={{ display: isOpen ? "grid" : "none" }}
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-input"
            placeholder="Salary, Product..."
            required
            value={transaction.description}
            onChange={(e) =>
              setTransaction({ ...transaction, description: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Sum</label>
          <input
            type="number"
            className="form-input"
            placeholder="1000"
            step="0.01"
            required
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <Dropdown
            onSelect={handleTypeSelect}
            selected={selectType}
            options={optionsType}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <Dropdown
            onSelect={handleCategorySelect}
            selected={selectCategory}
            options={options}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>

      <div className="transactions-list">
        {filteredTransactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <h3>No transactions yet</h3>
            <p>Add your first transaction to start tracking your finances</p>
          </div>
        )}

        {filteredTransactions.map((transaction) => (
          <div className="transaction-item" key={transaction.id}>
            <div className="transaction-info">
              <div className={`transaction-icon ${transaction.type}-icon`}>
                {categoryIcons[transaction.category as keyof typeof categoryIcons] || '💰'}
              </div>
              <div className="transaction-details">
                <h4>{transaction.description}</h4>
                <p>{transaction.category}</p>
                <p>{new Date(transaction.date!).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="amount-delete-btn" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className={`transaction-amount ${transaction.type}-amount`}>
                {transaction.type === "income" ? "+" : "-"}
                {Math.round(Number(transaction.amount))}
              </div>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

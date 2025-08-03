export interface TransactionData {
  id?: number;
  description: string;
  amount: string;
  type: string;
  category: string;
  date?: string;
}


export interface Option {
  label: string;
  value: string;
  icon?: string;
}

export const categoryIcons = {
  food: '🍔',
  transport: '🚗',
  housing: '🏠',
  entertainment: '🎮',
  shopping: '🛒',
  salary: '💰',
  bills: '🧾',
  health: '🏥',
  education: '📚',
  other: '❓'
};

export const options: Option[] = [
  { label: 'Salary', value: 'salary', icon: '💵' },
  { label: 'Food', value: 'food', icon: '🍔' },
  { label: 'Transport', value: 'transport', icon: '🚌' },
  { label: 'Entertainment', value: 'entertainment', icon: '🎮' },
  { label: 'Shopping', value: 'shopping', icon: '🛍️' },
  { label: 'Health', value: 'health', icon: '🏥' },
  { label: 'Education', value: 'education', icon: '📚' },
  { label: 'Bills', value: 'bills', icon: '📄' },
  { label: 'Other', value: 'other', icon: '❓' },
  { label: "Saving", value: "saving", icon: "💰" },
];

export const optionsType: Option[] = [
  { label: "Income", value: "income", icon: "+" },
  { label: "Expense", value: "expense", icon: "-" }
]
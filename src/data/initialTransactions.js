/** Seed data — same shape as the original transaction page. */
export const initialTransactions = [
  { id: 1, date: '2023-10-28', merchant: 'Amazon', category: 'Shopping', amount: -120 },
  { id: 2, date: '2023-10-25', merchant: 'Uber', category: 'Transport', amount: -30 },
  { id: 3, date: '2023-10-20', merchant: 'Payroll', category: 'Salary', amount: 3200 },
  { id: 4, date: '2023-10-15', merchant: 'Netflix', category: 'Entertainment', amount: -50 },
  { id: 5, date: '2023-10-12', merchant: 'Whole Foods', category: 'Food & Dining', amount: -450 },
  { id: 6, date: '2023-10-10', merchant: 'Landlord', category: 'Housing', amount: -1200 },
  { id: 7, date: '2023-10-08', merchant: 'City Power', category: 'Healthcare', amount: -120 },
  { id: 8, date: '2023-10-05', merchant: 'Walmart', category: 'Utensils', amount: -75 },
  { id: 9, date: '2023-09-30', merchant: 'Target', category: 'Shopping', amount: -65 },
  { id: 10, date: '2023-09-28', merchant: 'Client A', category: 'Salary', amount: 800 },
];

/** Category → accent color for overview list chips (aligned with original script.js). */
export const categoryColor = (category) => {
  const map = {
    Shopping: '#f97316',
    Transport: '#6366f1',
    Salary: '#10b981',
    Entertainment: '#ec4899',
    'Food & Dining': '#f59e0b',
    Housing: '#8b5cf6',
    Healthcare: '#3b82f6',
    Utensils: '#f59e0b',
    Freelance: '#10b981',
    Income: '#10b981',
  };
  return map[category] || '#6b7280';
};

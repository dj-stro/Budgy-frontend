import type { TransactionModel, CategoryType, Account, User } from '../types/models.js'; 


export interface CategoryChartEntry {
  category: string; // Category name
  total: number;    // Total amount
  name: string;     // Alias for chart library (e.g., recharts)
  value: number;    // Alias for chart library (e.g., recharts)
  [key: string]: any;
}


export interface DateChartEntry {
  date: string;
  amount: number;
}


export interface AccountChartEntry {
  account: string; // Account name
  total: number;
  name: string;
  value: number;
}

// 4. For User Data (Bar Chart)
export interface UserChartEntry {
  user: string; // Username
  total: number;
  name: string;
  value: number;
}

// --- Utility Functions ---

export const prepareCategoryData = (
  transactions: TransactionModel[]
): CategoryChartEntry[] => {
  
  const grouped: Record<string, number> = {};
  const excluded = ["Salary", "Savings Transfer"]; 

  transactions.forEach((tx: TransactionModel & { category?: CategoryType }) => {
    // Determine the category name, defensively checking for existence
    const categoryName = tx.category?.name || "Uncategorized";

    if (excluded.includes(categoryName)) {
      return; // skip this transaction
    }
    
    // Sum the amounts
    grouped[categoryName] = (grouped[categoryName] || 0) + tx.amount;
  });

  // Transform the map into the required output array format
  return Object.entries(grouped).map(([category, total]) => ({
    category,
    total,
    name: category,  
    value: total
  }));
};

// 2. Group by date
export const prepareDateData = (
  transactions: TransactionModel[]
): DateChartEntry[] => {
  const grouped: Record<string, number> = {};

  transactions.forEach(tx => {
    // Note: tx.date is already string in your model, which is necessary for the key
    const date = tx.date;
    grouped[date] = (grouped[date] || 0) + tx.amount;
  });

  return Object.entries(grouped)
    .map(([date, amount]) => ({ 
        date, 
        amount 
    }))
    // Sort transactions by date (oldest first)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// 3. Group by account
export const prepareAccountData = (
  transactions: TransactionModel[]
): AccountChartEntry[] => {
  const grouped: Record<string, number> = {};

  transactions.forEach((tx: TransactionModel & { account?: Account }) => {
    // Using optional chaining on a property assumed to exist
    const accountName = tx.account?.name || "Unknown"; 
    grouped[accountName] = (grouped[accountName] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([account, total]) => ({
    account,
    total,
    name: account,
    value: total
  }));
};

// 4. Group by user
export const prepareUserData = (
  transactions: TransactionModel[]
): UserChartEntry[] => {
  const grouped: Record<string, number> = {};

  transactions.forEach((tx: TransactionModel & { user?: User }) => {
    // NOTE: Similar to accounts/categories, this assumes the full User object 
    // is merged into the transaction object under the property 'user'.
    
    // Accessing 'username' which must be defined on User model (only 'name' is in provided model)
    // I'll stick to 'username' as in original code, assuming it exists.
    const username = tx.user?.name || "Unknown"; 
    grouped[username] = (grouped[username] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([user, total]) => ({
    user,
    total,
    name: user,
    value: total
  }));
};
// Group by category (for bar chart or pie chart)
export const prepareCategoryData = (transactions) => {
  const grouped = {};
  const excluded = ["Salary", "Savings Transfer"]; 

  transactions.forEach(tx => {
    const categoryName = tx.category?.name || "Uncategorized";

    if (excluded.includes(categoryName)) {
      return; // skip this transaction
    }
    
    grouped[categoryName] = (grouped[categoryName] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([category, total]) => ({
    category,
    total,
    name: category,  
    value: total
  }));
};

// Group by date (for line chart / spending over time)
export const prepareDateData = (transactions) => {
  const grouped = {};

  transactions.forEach(tx => {
    const date = tx.date;
    grouped[date] = (grouped[date] || 0) + tx.amount;
  });

  return Object.entries(grouped)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Group by account (for account balances/spending breakdown)
export const prepareAccountData = (transactions) => {
  const grouped = {};

  transactions.forEach(tx => {
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

// Group by user (multi-user budget)
export const prepareUserData = (transactions) => {
  const grouped = {};

  transactions.forEach(tx => {
    const username = tx.user?.username || "Unknown";
    grouped[username] = (grouped[username] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([user, total]) => ({
    user,
    total,
    name: user,
    value: total
  }));
};

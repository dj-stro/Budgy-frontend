export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface TransactionModel {
    id: string; 
    description: string;
    amount: number; 
    date: string;
    type: TransactionType;
    categoryId: string;
    accountFromId?: string; 
    accountToId?: string; 
    userId: string;
}

export interface TransactionFormInputs {
  description: string;
  amount: number | string;
  date: string;
  type: TransactionType;
  categoryId: string;
  accountFromId?: string | undefined; 
  accountToId?: string | undefined; 
  transferCheck?: string | undefined;
  userId: string;
}

export interface TransactionFormData {
    categories: CategoryType[];
    accounts: Account[];
    dataLoading: boolean;
    dataError: string | null;
}

export interface TransactionCreationPayload {
    // This is the model the backend EXPECTS to receive
    description: string;
    amount: number | string;
    date: string;
    type: TransactionType;
    categoryId: string;
    accountFromId?: string; 
    accountToId?: string; 
    userId: string;
}

export interface TransactionProps {
  transactions: TransactionModel;
  txLoading: boolean;
  currentUser: User;
  selectedMonths: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface UserFormPayload {
  id: number | string;
}

export interface Account {
  id: string;
  name: string;
  description: string;
  balance: number;
  budgetBalance: number;
  budgetAllowed: number;
  user?: User | null;
}

export interface AccountFormState {
  name: string;
  description: string;
  balance: number | string;
  budgetBalance: number | string;
  budgetAllowed: number | string;
  user: UserFormPayload;
}

export interface AccountItemProps {
  acc: Account;
}

export interface AccountRowProps {
  accounts: Account[];
}

export interface AccountCreationPayload {
  name: string;
  description: string;
  balance: number;
  budgetBalance: number;
  budgetAllowed: number;
  // This line overrides the complex 'User' type with the simplified payload type
  user: UserFormPayload; 
}

export type CategoryTypeValue = 
  "INCOME" | "EXPENSE" | "ASSET" | "LIABILITY" | "EQUITY" | "TRANSFER";

export type CategoryType = {
    id: string; 
    name: string;
    // Use the defined union type here
    type: CategoryTypeValue; 
};

export interface CategoryFormData {
  name: string;
  type: CategoryTypeValue; 
}

export interface CategoryFormProps {
    onSubmit: (FormData: CategoryFormData, clearForm: () => void) => void;
    isSubmitting: boolean;
}

export interface CategoryListProps {
  categories: CategoryType[]; // An array of CategoryType objects
}
export interface Transaction {
  id: number;
  date: string;
  type: string;
  symbol: string;
  price: number;
  amount: number;
  totalPrice: number;
}
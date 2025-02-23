export interface StockData {
    id: number;
    symbol: string;
    date: string; // Using string for simplicity (e.g., "2025-02-22")
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    dividends: number;
    stockSplits: number;
}
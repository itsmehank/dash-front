export interface StockData {
    id: number;
    symbol: string;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    dividends: number;
    stockSplits: number;
    sma5?: number; // Optional pre-calculated 5-day SMA
    sma20?: number; // Optional pre-calculated 20-day SMA
    sma40?: number; // Optional pre-calculated 40-day SMA
  }
  
  export interface StockWithSMA extends StockData {
    sma?: number; // Optional SMA (can be pre-calculated or dynamic)
  }
import React, { useState } from 'react';
import { StockData } from '../types/stock';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const mockStockData: StockData[] = [
  { id: 1, symbol: 'AAPL', date: '2025-02-20', open: 150.25, high: 152.75, low: 149.80, close: 151.90, volume: 1200000, dividends: 0.23, stockSplits: 0 },
  { id: 2, symbol: 'AAPL', date: '2025-02-21', open: 151.90, high: 153.20, low: 150.50, close: 152.80, volume: 1300000, dividends: 0, stockSplits: 0 },
  { id: 3, symbol: 'AAPL', date: '2025-02-22', open: 152.80, high: 155.00, low: 151.75, close: 154.30, volume: 1400000, dividends: 0, stockSplits: 0 },
];

const Single: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.toUpperCase());
      setSearchInput(''); // Clear input after search
    }
  };

  const chartData = mockStockData.filter((stock) => stock.symbol === symbol).map((stock) => ({
    date: stock.date,
    close: stock.close,
  }));

  return (
    <div className="p-6 w-full max-w-screen-xl mx-auto md:p-6 sm:p-4">
      {/* Search Box */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-6 sm:mb-4">Single Stock Chart</h2>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full md:max-w-lg sm:max-w-sm">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 sm:p-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors md:px-5 md:py-3 sm:px-4 sm:py-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:p-6 sm:p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-6 sm:mb-4">{symbol} Stock Price</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Close Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-600 md:text-lg sm:text-base">No data available for {symbol}</p>
      )}
    </div>
  );
};

export default Single;
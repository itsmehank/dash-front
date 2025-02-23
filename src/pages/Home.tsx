import React from 'react';
import { StockData } from '../types/stock';

const mockStockData: StockData[] = [
  {
    id: 1,
    symbol: 'AAPL',
    date: '2025-02-20',
    open: 150.25,
    high: 152.75,
    low: 149.80,
    close: 151.90,
    volume: 1200000,
    dividends: 0.23,
    stockSplits: 0,
  },
  {
    id: 2,
    symbol: 'GOOGL',
    date: '2025-02-20',
    open: 2750.10,
    high: 2780.50,
    low: 2740.30,
    close: 2765.80,
    volume: 800000,
    dividends: 0,
    stockSplits: 0,
  },
  {
    id: 3,
    symbol: 'TSLA',
    date: '2025-02-20',
    open: 900.50,
    high: 915.20,
    low: 895.75,
    close: 910.30,
    volume: 1500000,
    dividends: 0,
    stockSplits: 0,
  },
];

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-left text-gray-700">Symbol</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Date</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Open</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">High</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Low</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Close</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Volume</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Dividends</th>
              <th className="px-4 py-2 border-b text-left text-gray-700">Stock Splits</th>
            </tr>
          </thead>
          <tbody>
            {mockStockData.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{stock.symbol}</td>
                <td className="px-4 py-2 border-b">{stock.date}</td>
                <td className="px-4 py-2 border-b">{stock.open.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{stock.high.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{stock.low.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{stock.close.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{stock.volume.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{stock.dividends.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{stock.stockSplits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
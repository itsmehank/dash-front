import React, { useState, useEffect } from 'react';
import { StockData } from '../types/stock';
import ReactApexChart from 'react-apexcharts'; // Import ReactApexChart
import { ApexOptions } from 'apexcharts';


const Single: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL'); // Default to AAPL
  const [searchInput, setSearchInput] = useState<string>('');
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Default to 1 week ago
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]); // Today

  useEffect(() => {
    fetchStocks();
  }, [symbol, startDate, endDate]); // Ensure this triggers on startDate/endDate changes

  const fetchStocks = async () => {
    setLoading(true);
    try {
      console.log('Fetching stocks for symbol:', symbol, 'from', startDate, 'to', endDate); // Debug log
      const response = await fetch(
        `http://localhost:8080/api/stocks/symbol/${symbol}/range?startDate=${startDate}&endDate=${endDate}`
      );
      console.log('Response:', response);
      if (!response.ok) throw new Error('Failed to fetch stocks');
      const data = await response.json();
      console.log('Fetched data:', data);
      // Ensure data includes OHLC fields, defaulting if missing
      const formattedData = (data.content || data).map((stock: any) => ({
        id: stock.id || 0,
        symbol: stock.symbol || symbol,
        date: stock.date || '',
        open: stock.open || stock.close || 0, // Default open to close if missing
        high: stock.high || stock.close || 0, // Default high to close if missing
        low: stock.low || stock.close || 0, // Default low to close if missing
        close: stock.close || 0,
        volume: stock.volume || 0,
        dividends: stock.dividends || 0,
        stockSplits: stock.stockSplits || 0,
      }));
      console.log('Formatted data:', formattedData);
      setStocks(formattedData);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setStocks([]); // Reset stocks on error to avoid partial data
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.toUpperCase());
      setSearchInput('');
    }
  };

  const setPeriod = (days: number) => {
    const today = new Date();
    const end = today.toISOString().split('T')[0];
    const start = new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setStartDate(start);
    setEndDate(end);
    console.log('Setting period:', { start, end }); // Debug log
  };

  // Predefined period buttons (short labels, modern colors)
  const periodButtons = [
    { label: '5D', days: 5 },
    { label: '1M', days: 30 },
    { label: '3M', days: 90 },
    { label: '6M', days: 180 },
    { label: '12M', days: 365 },
  ];

  if (loading) return <div>Loading...</div>;

  // Map StockData to ApexCharts candlestick format
  const chartData = stocks.map(stock => ({
    x: new Date(stock.date).getTime(), // Convert date to timestamp
    y: [stock.open, stock.high, stock.low, stock.close], // [open, high, low, close]
  }));

  console.log('Chart Data:', chartData); // Debug log to verify data

  // ApexCharts options for candlestick chart, typed as ApexOptions
  const options: ApexOptions = {
    chart: {
      type: "candlestick", // Explicitly set to "candlestick" (literal string with double quotes)
      height: 400,
    },
    title: {
      text: `${symbol} Stock Price`,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false, // Use local time
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
      },
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
  };

  const series = [{ data: chartData }];

  return (
    <div className="p-6 w-full max-w-screen-xl mx-auto md:p-6 sm:p-4">
      {/* Search Box, Date Inputs, and Period Buttons */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-6 sm:mb-4">Single Stock Chart</h2>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full md:max-w-lg sm:max-w-sm mb-4">
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
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Date Inputs */}
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <div>
              <label htmlFor="startDate" className="text-gray-700 mr-2">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="text-gray-700 mr-2">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Period Buttons (smaller, under date boxes, modern colors) */}
          <div className="flex gap-2 flex-wrap mt-2">
            {periodButtons.map((button) => (
              <button
                key={button.label}
                onClick={() => setPeriod(button.days)}
                className="px-2 py-1 text-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-md hover:from-teal-600 hover:to-blue-600 transition-colors"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ApexCharts Candlestick Chart */}
      {chartData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:p-6 sm:p-4">
          <ReactApexChart options={options} series={series} type="candlestick" height={400} />
        </div>
      ) : (
        <p className="text-gray-600 md:text-lg sm:text-base">No data available for {symbol}</p>
      )}
    </div>
  );
};

export default Single;
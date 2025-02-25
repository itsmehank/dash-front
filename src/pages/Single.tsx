import React, { useState, useEffect } from 'react';
import { StockData } from '../types/stock';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Single: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [searchInput, setSearchInput] = useState<string>('');
  const [stocks, setStocks] = useState<StockData[]>([]); // Initial empty, but not reset during fetch
  const [loading, setLoading] = useState<boolean>(false); // Start as false, only for feedback
  const [startDate, setStartDate] = useState<string>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchStocks();
  }, [symbol, startDate, endDate]);

  const fetchStocks = async () => {
    setLoading(true); // Still track loading for feedback if needed
    try {
      console.log('Fetching stocks for symbol:', symbol, 'from', startDate, 'to', endDate);
      const response = await fetch(
        `http://localhost:8080/api/stocks/symbol/${symbol}/range-no-pagination?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) throw new Error('Failed to fetch stocks');
      const data = await response.json();
      const formattedData = data.map((stock: any) => ({
        id: stock.id || 0,
        symbol: stock.symbol || symbol,
        date: stock.date || '',
        open: stock.open || stock.close || 0,
        high: stock.high || stock.close || 0,
        low: stock.low || stock.close || 0,
        close: stock.close || 0,
        volume: stock.volume || 0,
        dividends: stock.dividends || 0,
        stockSplits: stock.stockSplits || 0,
      }));
      console.log('Formatted data:', formattedData);
      setStocks(formattedData); // Update with new data, keeping old data until this point
    } catch (error) {
      console.error('Error fetching stocks:', error);
      // Optionally keep old data instead of clearing: setStocks([]) removed
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
    console.log('Setting period:', { start, end });
  };

  const periodButtons = [
    { label: '5D', days: 5 },
    { label: '1M', days: 30 },
    { label: '3M', days: 90 },
    { label: '6M', days: 180 },
    { label: '12M', days: 365 },
  ];

  const chartData = stocks.map(stock => ({
    x: new Date(stock.date).getTime(),
    y: [stock.open, stock.high, stock.low, stock.close],
  }));

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 400,
      events: {
        zoomed: (chartContext, { xaxis }) => {
          const newStartDate = new Date(xaxis.min).toISOString().split('T')[0];
          const newEndDate = new Date(xaxis.max).toISOString().split('T')[0];
          console.log('Zoomed to range:', { newStartDate, newEndDate });
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        },
      },
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
      labels: { datetimeUTC: false },
    },
    yaxis: {
      tooltip: { enabled: true },
    },
    tooltip: {
      enabled: true,
      x: { format: 'dd MMM yyyy HH:mm:ss' },
      y: { formatter: (value: number) => `$${value.toFixed(2)}` },
    },
    toolbar: { autoSelected: 'zoom' },
  };

  const series = [{ data: chartData }];

  return (
    <div className="p-6 w-full max-w-screen-xl mx-auto md:p-6 sm:p-4">
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

      {/* Always render the chart, overlay loading if needed */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:p-6 sm:p-4 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
            <span className="text-gray-600">Loading...</span>
          </div>
        )}
        {stocks.length > 0 ? (
          <ReactApexChart options={options} series={series} type="candlestick" height={400} />
        ) : (
          <p className="text-gray-600 md:text-lg sm:text-base">No data available for {symbol}</p>
        )}
      </div>
    </div>
  );
};

export default Single;
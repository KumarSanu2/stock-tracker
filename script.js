
async function fetchStockData(stockSymbol) {
    const apiKey = '7TEASR9L4Y8EQIH3' ; 
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

function displayStockInfo(stockData) {
    const stockDetails = document.getElementById('stock-details');
    if (stockData && stockData['Meta Data']) {
        const lastRefreshed = stockData['Meta Data']['3. Last Refreshed'];
        const lastClosePrice = stockData['Time Series (Daily)'][lastRefreshed]['4. close'];
        stockDetails.textContent = `Symbol: ${stockData['Meta Data']['2. Symbol']}, Last Close: $${lastClosePrice}`;
    } else {
        stockDetails.textContent = 'Stock data not available. Please try again.';
    }
}

document.getElementById('load-stock').addEventListener('click', async () => {
    const stockSymbol = document.getElementById('stock-select').value;
    const stockData = await fetchStockData(stockSymbol);
    displayStockInfo(stockData);
    displayStockChart(stockData);
});

document.getElementById('search-stock').addEventListener('click', async () => {
    const stockSymbol = document.getElementById('stock-search').value.toUpperCase();
    const stockData = await fetchStockData(stockSymbol);
    displayStockInfo(stockData);
    displayStockChart(stockData);
});

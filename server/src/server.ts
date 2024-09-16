import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// cache for exchange rates
const exchangeRateCache = {};
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes

// API to convert currency
// POST /api/convert
// Request body: { fromCurrency: string, toCurrency: string, amount: number }
// Response: { result: number, lastUpdate: number }
app.post('/api/convert', async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  const cacheKey = `${fromCurrency}_${toCurrency}`;
  const now = Date.now();

  // check if the cache is still valid
  if (
    (exchangeRateCache as Record<string, any>)[cacheKey] &&
    now - (exchangeRateCache as Record<string, any>)[cacheKey].timestamp <
      CACHE_DURATION
  ) {
    const rate = (exchangeRateCache as Record<string, any>)[cacheKey].rate;
    const conversion_result = rate * amount;
    const time_last_update_unix = (exchangeRateCache as Record<string, any>)[
      cacheKey
    ].lastUpdate;
    return res.json({
      result: conversion_result,
      lastUpdate: time_last_update_unix,
    });
  }

  try {
    const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
    );

    const { conversion_rate, time_last_update_unix } = response.data;

    //update cache
    const updatedCache: Record<string, any> = exchangeRateCache;
    updatedCache[cacheKey] = {
      rate: conversion_rate,
      lastUpdate: time_last_update_unix,
      timestamp: now,
    };
    const conversion_result = conversion_rate * amount;
    res.json({ result: conversion_result, lastUpdate: time_last_update_unix });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// API to fetch all available currencies
// GET /api/currencies
// Response: { [currency_code: string]: currency_name: string }
app.get('/api/currencies', async (req, res) => {
  try {
    const response = await axios.get<{ [key: string]: string }>(
      'https://openexchangerates.org/api/currencies.json'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching currencies:');
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

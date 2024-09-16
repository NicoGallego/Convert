import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import type { InputNumberProps } from 'antd';
import { InputNumber, Spin, Select } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import debounce from 'lodash/debounce';
import Switch from './Switch';
import CryptoTab from './CryptoTab';
import ConvertResult from './ConvertResult';

dayjs.extend(utc);

const ConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.75rem; /* Base font size */

  .currency-input {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .convert-button {
    background-color: #004d40;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem; /* 4px */
    cursor: pointer;
  }

  .resultContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .amount {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: #004b3d;
  }

  .result {
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 28rem;
    overflow: hidden;
  }

  .lastUpdate {
    font-size: 0.75rem;
    color: #004b3d;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  .ant-input-number:focus,
  .ant-input-number-focused {
    border-color: #004b3d;
  }

  .ant-input-number:hover {
    border-color: #004b3d;
  }

  .ant-input-number-input-wrap input:focus {
    border-color: #004b3d !important;
    box-shadow: none;
  }

  .ant-input-number-handler:hover {
    color: #004b3d;
  }

  .ant-input-number-handler:hover .ant-input-number-handler-up-inner,
  .ant-input-number-handler:hover .ant-input-number-handler-down-inner,
  .ant-input-number-handler-up-inner:hover,
  .ant-input-number:focus,
  .ant-input-number-focused,
  .ant-input-number:hover,
  .ant-input-number-handler-down-inner:hover {
    color: #004b3d;
  }

  .ant-spin-dot-item {
    background-color: #004b3d;
  }

  .ant-card-bordered {
    border: none;
  }

  .select {
    margin: 1rem 0.5rem 0 0.5rem;
    width: 15.625rem;
  }

  .inputNumber {
    width: 10.625rem;
  }

  .loader {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 1.95rem 0;
  }

  .ant-select:hover .ant-select-selector {
    border-color: #004b3d !important;
  }

  .ant-select-focused .ant-select-selector {
    border-color: #004b3d !important;
  }

  .switch-container {
    margin: 0.5rem 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .cryptoTab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .result {
      font-size: 1.5rem;
      width: 100%;
    }

    .amount {
      font-size: 0.85rem;
    }

    .inputs {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }
  }

  @media screen and (max-width: 480px) {
    .result {
      font-size: 1.2rem;
    }

    .amount {
      font-size: 0.75rem;
    }

    .select {
      width: 10rem;
    }

    .inputNumber {
      width: 8rem;
    }
  }
`;

const ConverterTab = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [result, setResult] = useState<number | null>(null);
  const [loadingQuick, setLoadingQuick] = useState<boolean>(false);
  const [loadingSlow, setLoadingSlow] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [fromCurrencyName, setFromCurrencyName] = useState<string>('Euro');
  const [toCurrencyName, setToCurrencyName] = useState<string>('United States Dollar');
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [isCryptoMode, setIsCryptoMode] = useState<boolean>(false);
  const mostTradedCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD'];
  const currenciesArray = Object.entries(currencies).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  // Prioritize the most traded currencies
  const sortedCurrencies = [
    ...mostTradedCurrencies.map((code) => ({
      value: code,
      label: `${currencies[code]} (${code})`,
    })),
    ...currenciesArray
      .filter((currency) => !mostTradedCurrencies.includes(currency.value))
      .map((currency) => ({
        ...currency,
        label: `${currency.label} (${currency.value})`,
      })),
  ];

  useEffect(() => {
    getCurrrencies();
  }, []);

  useEffect(() => {
    handleConvert(amount);
  }, [amount]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      handleConvert(amount);
    }
  }, [fromCurrency, toCurrency]);

  //use to show the loader when the loadingSlow state is true
  //use the setTimeout function to show the loader after 50ms
  useEffect(() => {
    if (loadingQuick) {
      const delayTimer = setTimeout(() => setLoadingSlow(true), 50);
      return () => clearTimeout(delayTimer);
    } else {
      setLoadingSlow(false);
    }
  }, [loadingQuick]);

  //use to convert the amount from one currency to another
  //use the debounce function to avoid making too many requests
  //use the axios post method to send the request to the server
  //if the request is successful, set the result, lastUpdate, and result states
  //if the request fails, set the error state
  const handleConvert = useCallback(
    debounce(async (amountToConvert: number) => {
      setError('');
      setLoadingQuick(true);
      try {
        const response = await axios.post('http://localhost:5000/api/convert', {
          fromCurrency,
          toCurrency,
          amount: Number(amountToConvert),
        });

        setResult(response.data.result);
        setLastUpdate(
          dayjs
            .unix(response.data.lastUpdate)
            .utc()
            .format('MMM, DD, YYYY HH:mm UTC')
        );
      } catch (error) {
        setError('Failed to fetch conversion rate. Please try again.');
      } finally {
        setLoadingQuick(false);
      }
    }, 300),
    [fromCurrency, toCurrency, currencies]
  );

  //use to get the currencies from the server
  //use the axios get method to send the request to the server
  //if the request is successful, set the currencies state
  //if the request fails, set the error state
  const getCurrrencies = async () => {
    setLoadingQuick(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/currencies');
      setCurrencies(response.data);
    } catch (error) {
      setError('Failed to fetch currencies. Please try again.');
    } finally {
      setLoadingQuick(false);
    }
  };

  //use to update the amount state when the input value changes
  //use the setAmount function to update the amount state
  //use the handleConvert function to convert the amount
  const onAmountChange: InputNumberProps['onChange'] = (value) => {
    if (value !== null && value !== '' && value !== 0) {
      setAmount(value as number);
      handleConvert(value as number);
    } else {
      setAmount(1);
    }
  };

  //use to update the fromCurrency and fromCurrencyName states when the from currency changes
  const onChangeFromCurrency = (value: string) => {
    setFromCurrency(value);
    setFromCurrencyName(
      currenciesArray.find((currency) => currency.value === value)?.label || ''
    );
  };

  //use to update the toCurrency and toCurrencyName states when the to currency changes
  const onChangeToCurrency = (value: string) => {
    setToCurrency(value);
    setToCurrencyName(
      currenciesArray.find((currency) => currency.value === value)?.label || ''
    );
  };

  //use to update the isCryptoMode state when the switch is toggled
  const handleSwitchToggle = (isCrypto: boolean) => {
    setIsCryptoMode(isCrypto);
  };

  return (
    <ConverterContainer>
      <div className='switch-container'>
        <div className='switch-item'>
          <Switch onToggle={handleSwitchToggle} />
        </div>
      </div>

      {isCryptoMode ? (
        <div className='cryptoTab'>
          <CryptoTab />
        </div>
      ) : (
        <>
          {loadingSlow ? (
            <div className='loader'>
              <Spin size='large' />
            </div>
          ) : (
            <>
              <ConvertResult
                amount={amount}
                result={result}
                error={error}
                lastUpdate={lastUpdate}
                fromCurrencyName={fromCurrencyName}
                toCurrencyName={toCurrencyName}
              />
              <div className='inputs'>
                <InputNumber
                  className='inputNumber'
                  min={1}
                  value={amount}
                  onChange={onAmountChange}
                />
                <Select
                  className='select'
                  showSearch
                  optionFilterProp='label'
                  onChange={onChangeFromCurrency}
                  options={sortedCurrencies}
                  defaultValue={fromCurrency}
                />
              </div>
              <div className='inputs'>
                <InputNumber
                  className='inputNumber'
                  value={result?.toFixed(2)}
                  readOnly
                />
                <Select
                  className='select'
                  showSearch
                  optionFilterProp='label'
                  onChange={onChangeToCurrency}
                  options={sortedCurrencies}
                  defaultValue={toCurrency}
                />
              </div>
            </>
          )}
        </>
      )}
    </ConverterContainer>
  );
};

export default ConverterTab;

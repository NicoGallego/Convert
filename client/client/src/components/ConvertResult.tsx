
interface ConvertResultProps {
  amount: number | null;
  result: number | null;
  error: string | null;
  lastUpdate: string;
  fromCurrencyName: string;
  toCurrencyName: string;
}

const ConvertResult = (props: ConvertResultProps) => {
  const {
    amount,
    result,
    error,
    lastUpdate,
    fromCurrencyName,
    toCurrencyName,
  } = props;
  return (
    <>
      <div className='amount'>
        {amount && result && !error && `${amount} ${fromCurrencyName} =`}
      </div>
      <div className='resultContainer'>
        <div className='result'>
          {result && !error && `${result.toFixed(2)} ${toCurrencyName}`}
        </div>
        <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
        <div className='lastUpdate'>
          {result && `last update ${lastUpdate}`}
        </div>
      </div>
    </>
  );
};

export default ConvertResult;

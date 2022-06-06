export const calculateHour = ({ value, max, min, prov }) => {
  // const totalDuration = (max * 1 + min * 1 + prov * 1 * 4) / 6;
  const totalDuration = (min * 1 + max * 1 + prov * 4) / 6;

  const result = value === 1 ? totalDuration : totalDuration * 0.3;

  return parseFloat(result.toFixed(2));
};

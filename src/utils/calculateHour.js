export const calculateHour = ({ value, max, min, prov }) => {
  const totalDuration = (max + min + (4 * prov) / 6) * 1.15;

  const result = value === 1 ? totalDuration : (totalDuration * 30) / 100;

  return parseFloat(result.toFixed(2));
};

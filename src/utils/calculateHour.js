export const calculateHour = ({ value, max, min, prov }) => {
  const totalDuration = (max + min + (4 * prov) / 6) * 1.15;

  return value === 1 ? totalDuration : (totalDuration * 30) / 100;
};

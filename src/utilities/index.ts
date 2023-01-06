export function subtractMonths(date: Date | string, months: number) {
  const dateCopy = new Date(date);
  dateCopy.setMonth(dateCopy.getMonth() - months);
  return dateCopy;
}
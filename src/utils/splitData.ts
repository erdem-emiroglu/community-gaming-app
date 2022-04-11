export function splitData<T>(data: Array<T>, currentPage: number) {
  const splittedNomineeData = [];
  for (let i = 0; i < data.length; i += 6) {
    const chunk = data.slice(i, i + 6);
    splittedNomineeData.push(chunk);
  }
  return splittedNomineeData[currentPage - 1] ?? [];
}

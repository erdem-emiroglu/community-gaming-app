type WithIdType = {
  id: number;
};

export function createId<T extends WithIdType>(data: Array<T>) {
  const isIdInclude = (array: Array<T>, id: number) => {
    return array.some((item) => item.id === id);
  };

  let newId = data.length + 1;
  if (isIdInclude(data, newId)) {
    for (const item of data) {
      const chunkId = item.id + 1;
      if (!isIdInclude(data, chunkId)) {
        newId = chunkId;
      }
    }
  }

  return newId;
}

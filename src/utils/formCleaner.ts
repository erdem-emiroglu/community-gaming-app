export function cleanForm<T extends Record<string, string>>(form: T) {
  const cleanedForm = { ...form };
  for (const property in form) {
    cleanedForm[property] = "" as T[typeof property];
  }

  return cleanedForm;
}

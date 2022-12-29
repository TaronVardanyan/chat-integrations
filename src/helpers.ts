/**
 * Safe read json
 * @param str
 * @param defaultValue
 */
export const safeReadJson = (
  str: string,
  defaultValue = {}
): Record<string, any> => {
  let result = defaultValue;
  try {
    result = JSON.parse(str);
  } catch (e) {}

  return result;
};

export function uuidv4() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

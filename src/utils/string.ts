export default function trimString(
  str: string,
  length: number = 25
): string {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

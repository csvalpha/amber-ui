export function union() {
  return Array.from(new Set([...arguments].flat()))
}

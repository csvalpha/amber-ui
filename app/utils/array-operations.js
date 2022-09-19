export function union() {
  const uniques = new Set(
    [...arguments].reduce((a, b) => [...a, ...(b ?? [])], [])
  );
  return [...uniques];
}

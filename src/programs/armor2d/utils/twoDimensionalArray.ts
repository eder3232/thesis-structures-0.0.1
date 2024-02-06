export function twoDimensionalArray<T>(
    rows: number,
    columns: number,
    value: T
): T[][] {
    return Array(rows)
        .fill(null)
        .map((e) => Array(columns).fill(value))
}
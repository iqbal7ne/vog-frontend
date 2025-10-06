export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timer: NodeJS.Timeout;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}


export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatPrice(price: string | undefined): string {
  if (!price) return 'N/A';
  const match = price.match(/\d+/);
  if (!match) return price;
  const num = parseInt(match[0]);
  return `$${num.toLocaleString()}`;
}

export function formatRelativeTime(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function extractNumericValue(str: string | undefined): number {
  if (!str) return 0;
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

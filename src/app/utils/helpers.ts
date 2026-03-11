/**
 * Global Utility Functions for Noomko E-commerce
 */

// Format price in Mongolian Tugrik
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('mn-MN')}₮`;
};

// Format phone number for display
export const formatPhone = (phone: string): string => {
  // Assuming format: 7711-1234
  return phone.replace(/(\d{4})(\d{4})/, '$1-$2');
};

// Validate Mongolian phone number
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Check if product has discount
export const hasDiscount = (originalPrice?: number, currentPrice?: number): boolean => {
  if (!originalPrice || !currentPrice) return false;
  return originalPrice > currentPrice;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate slug from text (for URLs)
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Calculate estimated delivery date
export const getEstimatedDelivery = (type: 'ready' | 'preorder'): string => {
  const today = new Date();
  let deliveryDays = 0;
  
  if (type === 'ready') {
    deliveryDays = 2; // 1-2 days for ready stock
  } else {
    deliveryDays = 14; // 7-14 days for preorder
  }
  
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  
  const monthNames = [
    'Нэгдүгээр сар',
    'Хоёрдугаар сар',
    'Гуравдугаар сар',
    'Дөрөвдүгээр сар',
    'Тавдугаар сар',
    'Зургаадугаар сар',
    'Долоодугаар сар',
    'Наймдугаар сар',
    'Есдүгээр сар',
    'Аравдугаар сар',
    'Арван нэгдүгээр сар',
    'Арван хоёрдугаар сар'
  ];
  
  return `${monthNames[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
};

// Format date in Mongolian
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Check if free shipping applies
export const isFreeShipping = (totalAmount: number): boolean => {
  return totalAmount >= 50000;
};

// Calculate shipping cost
export const calculateShipping = (totalAmount: number): number => {
  if (isFreeShipping(totalAmount)) return 0;
  return 5000; // Default shipping cost
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// Get product stock status
export const getStockStatus = (stock?: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (!stock || stock === 0) return 'out-of-stock';
  if (stock <= 5) return 'low-stock';
  return 'in-stock';
};

// Get stock status text in Mongolian
export const getStockStatusText = (stock?: number): string => {
  const status = getStockStatus(stock);
  const statusTexts = {
    'in-stock': 'Бэлэн байна',
    'low-stock': `${stock} ширхэг үлдсэн`,
    'out-of-stock': 'Дууссан'
  };
  return statusTexts[status];
};

// Safe localStorage access (with SSR compatibility)
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Handle quota exceeded or other errors
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle errors
    }
  }
};

// Scroll to top smoothly
export const scrollToTop = (smooth: boolean = true): void => {
  if (typeof window === 'undefined') return;
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

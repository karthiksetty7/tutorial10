// ================= BASE =================

const common = {
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
  },

  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
  },

  shadow: {
    light: '0 8px 20px rgba(0,0,0,0.05)',
    medium: '0 15px 35px rgba(0,0,0,0.08)',
    heavy: '0 25px 60px rgba(0,0,0,0.12)',
  },
}

// ================= LIGHT THEME =================

export const lightTheme = {
  mode: 'light',

  colors: {
    background: 'linear-gradient(135deg, #f9fafb, #eef2ff)',
    surface: '#ffffff',
    card: '#ffffff',
    text: '#111827',
    mutedText: '#6b7280',

    primary: '#6366f1',
    primaryGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',

    secondary: '#e5e7eb',
    border: '#e5e7eb',

    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  },

  ...common,
}

// ================= DARK THEME =================

export const darkTheme = {
  mode: 'dark',

  colors: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    surface: '#1e293b',
    card: 'rgba(255,255,255,0.05)',
    text: '#f1f5f9',
    mutedText: '#94a3b8',

    primary: '#8b5cf6',
    primaryGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',

    secondary: '#334155',
    border: 'rgba(255,255,255,0.08)',

    success: '#22c55e',
    danger: '#f87171',
    warning: '#fbbf24',
  },

  ...common,
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const THEME_KEY = 'barthy-v2-theme'
const themeColors: Record<Theme, string> = {
  light: '#F6FAFD',
  dark: '#0A1931',
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function getInitialTheme(): Theme {
  const theme = document.documentElement.dataset.theme ?? null
  return isTheme(theme) ? theme : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  root.style.backgroundColor = themeColors[theme]
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', themeColors[theme])
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const setAndPersistTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme)
    try {
      window.localStorage.setItem(THEME_KEY, nextTheme)
    } catch {
      // A preferência continua aplicada na sessão quando o storage está bloqueado.
    }
    setTheme(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setAndPersistTheme(theme === 'light' ? 'dark' : 'light')
  }, [setAndPersistTheme, theme])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_KEY || !isTheme(event.newValue)) return
      applyTheme(event.newValue)
      setTheme(event.newValue)
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider.')
  }
  return context
}

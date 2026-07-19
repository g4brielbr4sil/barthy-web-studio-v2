import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'

export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const nextThemeLabel = isDark ? 'claro' : 'escuro'
  const currentThemeLabel = isDark ? 'escuro' : 'claro'

  return (
    <button
      className={`theme-toggle ${showLabel ? 'theme-toggle--labeled' : ''}`}
      type="button"
      aria-label={`Ativar tema ${nextThemeLabel}. Tema atual: ${currentThemeLabel}.`}
      aria-pressed={isDark}
      title={`Ativar tema ${nextThemeLabel}`}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <Sun className="theme-toggle__sun" size={18} />
        <Moon className="theme-toggle__moon" size={18} />
      </span>
      {showLabel && <span>Tema {currentThemeLabel}</span>}
    </button>
  )
}

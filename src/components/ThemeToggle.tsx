import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'

export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const nextThemeLabel = isDark ? 'claro' : 'escuro'
  const currentThemeLabel = isDark ? 'escuro' : 'claro'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      className={`theme-toggle ${showLabel ? 'theme-toggle--labeled' : ''}`}
      type="button"
      aria-label={`Ativar tema ${nextThemeLabel}. Tema atual: ${currentThemeLabel}.`}
      aria-pressed={isDark}
      title={`Ativar tema ${nextThemeLabel}`}
      onClick={toggleTheme}
    >
      <Icon size={18} aria-hidden="true" />
      {showLabel && <span>Tema {currentThemeLabel}</span>}
    </button>
  )
}

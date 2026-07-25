import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme/ThemeContext'
import { VisualCapabilitiesProvider } from '../visual/VisualCapabilitiesContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <VisualCapabilitiesProvider>{children}</VisualCapabilitiesProvider>
    </ThemeProvider>
  )
}

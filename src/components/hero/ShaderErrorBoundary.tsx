import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react'

interface ShaderErrorBoundaryProps {
  children: ReactNode
  onError: (reason: string) => void
}
interface ShaderErrorBoundaryState {
  failed: boolean
}

export class ShaderErrorBoundary extends Component<
  ShaderErrorBoundaryProps,
  ShaderErrorBoundaryState
> {
  state: ShaderErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ShaderErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const component = info.componentStack?.trim().split('\n')[0]
    this.props.onError(
      component ? `${error.message} (${component})` : error.message,
    )
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

import { useEffect, useState } from 'react'

const brasiliaFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

function getBrasiliaTime(): string {
  return brasiliaFormatter.format(new Date())
}

export function useBrasiliaTime(): string {
  const [time, setTime] = useState(getBrasiliaTime)

  useEffect(() => {
    const update = () => setTime(getBrasiliaTime())
    const delayUntilNextMinute = 60_000 - (Date.now() % 60_000)
    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      update()
      intervalId = window.setInterval(update, 60_000)
    }, delayUntilNextMinute)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [])

  return time
}

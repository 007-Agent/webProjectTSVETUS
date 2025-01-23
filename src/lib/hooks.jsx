import { useRef, useState, useEffect, useMemo } from 'react'

const useSender = () => {
  const [wait, setWait] = useState(false)

  const sender = useRef({
    mounted: false,
    state: { wait: false },
    setState: state => {
      if ('wait' in state) setWait(state.wait)
    }
  })

  const result = useMemo(() => {
    sender.current.state.wait = wait
    return { sender: sender.current, wait }
  }, [wait])

  useEffect(() => {
    sender.current.mounted = true
    return () => (sender.current.mounted = false)
  }, [])

  return result
}

export { useSender }

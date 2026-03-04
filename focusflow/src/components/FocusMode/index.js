import {useEffect, useState} from 'react'
import FocusModeModal from '../FocusModeModal'

const FocusMode = ({task, onClose, onComplete}) => {
  const [timeLeft, setTimeLeft] = useState(task.focus_time * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete(task)
    }
  }, [timeLeft, task, onComplete])

  return <FocusModeModal task={task} timeLeft={timeLeft} onClose={onClose} />
}

export default FocusMode

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FiAlertCircle } from 'react-icons/fi'

interface ErrorDisplayProps {
  message: string
  onRetry?: () => void
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  return (
    <ErrorContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      <ErrorIcon>
        <FiAlertCircle size={24} />
      </ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
      {onRetry && (
        <RetryButton 
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reintentar
        </RetryButton>
      )}
    </ErrorContainer>
  )
}

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 1rem 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

const ErrorIcon = styled.div`
  color: #f44336;
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem;
  font-size: 1rem;
`

const RetryButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
`

export default ErrorDisplay
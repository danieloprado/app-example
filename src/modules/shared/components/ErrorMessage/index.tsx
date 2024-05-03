import errorFormatter from '@/formatters/error';

import IconMessage from '../IconMessage';

interface ErrorMessageProps {
  error: any;
  small?: boolean;
  onPress?: () => void;
}

const ErrorMessage = ({ error, small, onPress }: ErrorMessageProps) => {
  return (
    <IconMessage
      icon='car-traction-control'
      message='Um erro aconteceu'
      small={small}
      description={errorFormatter(error)}
      buttonText='Tentar Novamente'
      onPress={onPress}
    />
  );
};

export default ErrorMessage;

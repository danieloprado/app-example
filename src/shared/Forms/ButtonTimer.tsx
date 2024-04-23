import { useState, useCallback, useEffect, memo } from 'react';
import { ViewStyle } from 'react-native';
import { ButtonProps, Button } from 'react-native-paper';

import { differenceInSeconds } from 'date-fns/differenceInSeconds';

interface ButtonTimerProps extends Omit<ButtonProps, 'onPresss'> {
  timer: number;
  startPressed?: boolean;
  styleWhenEnabled?: ViewStyle;
  onlyFirstRender?: boolean;
  hideText?: boolean;
  onPress(): void;
}

const ButtonTimer = memo(
  ({
    disabled,
    onPress,
    children,
    timer,
    startPressed,
    onlyFirstRender,
    hideText,
    style,
    styleWhenEnabled,
    ...props
  }: ButtonTimerProps) => {
    const [pressedDate, setPressedDate] = useState<Date | null>(() => (startPressed ? new Date() : null));
    const [diff, setDiff] = useState(() => (startPressed ? timer : 0));

    const handleOnPress = useCallback(() => {
      onPress && onPress();

      if (onlyFirstRender) return;

      setPressedDate(new Date());
      setDiff(timer);
    }, [onPress, onlyFirstRender, timer]);

    useEffect(() => {
      if (!pressedDate) return;

      const interval: any = setInterval(() => {
        const diff = timer - differenceInSeconds(new Date(), pressedDate);

        if (diff > 0) {
          setDiff(diff);
          return;
        }

        clearInterval(interval);
        setDiff(0);
      }, 1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pressedDate]);

    const isDisabled = disabled || diff > 0;

    return (
      <Button
        {...props}
        onPress={handleOnPress}
        disabled={isDisabled}
        style={[style, !isDisabled ? styleWhenEnabled : undefined]}
      >
        {!hideText && children}
        {diff > 0 ? ` Espere (${diff}s)` : hideText ? children : ''}
      </Button>
    );
  }
);

export default ButtonTimer;

import { memo, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Modal, ModalProps, Portal, useTheme } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';
import { MotiView, useDynamicAnimation } from 'moti';

import { useTw } from '@/hooks/useTw';

interface AppModalProps extends ModalProps {
  disableFullscreen?: boolean;
}

const deviceHeight = Dimensions.get('window').height;

const DISABLE_BACKDROP = { colors: { backdrop: 'transparent' } };

const AppModal = memo(
  ({ children, visible: visibleProp, disableFullscreen, style, contentContainerStyle, ...props }: AppModalProps) => {
    const tw = useTw();
    const paperTheme = useTheme();
    const isFocused = useIsFocused();

    const visible = visibleProp && isFocused;
    const animation = useDynamicAnimation(() => ({ translateY: deviceHeight }));

    useEffect(() => {
      if (visible) {
        animation.animateTo({ translateY: 0 });
        return;
      }

      animation.animateTo({ translateY: deviceHeight });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
      <Portal>
        <Modal
          {...props}
          {...{ disableElevation: true }}
          visible={visible && isFocused}
          style={tw.style('mt-0 h-full', style as any)}
          theme={disableFullscreen ? undefined : DISABLE_BACKDROP}
          contentContainerStyle={tw.style('h-full flex-1', contentContainerStyle as any)}
        >
          <MotiView
            state={animation}
            style={tw.style({
              'mx-5 overflow-hidden rounded-xl bg-background dark:bg-dark-background': disableFullscreen ?? false,
              'flex-1 bg-background dark:bg-dark-background': !disableFullscreen,
              'bg-dark-background': paperTheme.dark
            })}
            transition={{ type: 'timing', duration: 300 }}
          >
            {children}
          </MotiView>
        </Modal>
      </Portal>
    );
  }
);

export default AppModal;

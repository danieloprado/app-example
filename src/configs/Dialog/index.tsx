import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, IconButton, Text } from 'react-native-paper';

import { useTw } from '@/hooks/useTw';
import { logErrorWithToast } from '@/log';
import ButtonTimer from '@/shared/Forms/ButtonTimer';
import Icon from '@/shared/Icon';
import useDialogStore from '@/stores/dialog';

const DialogConfig = () => {
  const tw = useTw();

  const [loading, setLoading] = useState<string | null | undefined>(null);
  const { visible, icon, title, message, type, okText, cancelText, danger, cancelDanger, onComplete, hide, options } =
    useDialogStore();

  const onPressOk = useCallback(async () => {
    setLoading('ok');

    try {
      await Promise.resolve(onComplete?.(true));
      hide();
    } catch (err) {
      logErrorWithToast(err);
    } finally {
      setLoading(null);
    }
  }, [hide, onComplete]);

  const onPressCancel = useCallback(async () => {
    setLoading('cancel');

    try {
      await Promise.resolve(onComplete?.(false));
      hide();
    } catch (err) {
      logErrorWithToast(err);
    } finally {
      setLoading(null);
    }
  }, [hide, onComplete]);

  const onPressOption = useCallback(
    async (option: string | undefined) => {
      setLoading(option);

      try {
        await Promise.resolve(onComplete?.(true, option));
        hide();
      } catch (err) {
        logErrorWithToast(err);
      } finally {
        setLoading(null);
      }
    },
    [hide, onComplete]
  );

  return (
    <Dialog visible={visible ?? false} dismissable={type === 'options'} onDismiss={() => onPressOption(undefined)}>
      <Dialog.Content>
        <View style={tw`-mr-3 -mt-3 h-[50px] flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3`}>
            {!!icon ? <Icon name={icon} size={25} /> : null}
            <Text variant='titleLarge'>{title}</Text>
          </View>
          {type === 'options' && (
            <IconButton icon='close' size={30} onPress={() => onPressOption(undefined)} disabled={!!loading} />
          )}
        </View>

        <Text variant='bodyMedium'>{message}</Text>

        {type === 'options' && (
          <View style={tw`mt-5 gap-5`}>
            {options?.map(option => (
              <Button
                icon={option.icon}
                key={option.value}
                loading={loading === option.value}
                disabled={!!loading}
                mode='contained'
                onPress={() => onPressOption(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </View>
        )}
      </Dialog.Content>
      {type !== 'options' && (
        <Dialog.Actions>
          {type === 'confirmation' && (
            <Button
              loading={loading === 'cancel'}
              disabled={!!loading}
              onPress={onPressCancel}
              style={tw`w-4/10`}
              textColor={
                cancelDanger
                  ? (tw`text-error dark:text-dark-error`.color as string)
                  : (tw`text-onSurface dark:text-dark-onSurface`.color as string)
              }
            >
              {cancelText ?? 'Cancelar'}
            </Button>
          )}
          <ButtonTimer
            timer={danger ? 1 : 0}
            startPressed
            hideText
            mode='contained'
            onlyFirstRender
            loading={loading === 'ok'}
            disabled={!!loading}
            onPress={onPressOk}
            style={tw.style({ 'w-6/10': type === 'confirmation', 'w-full': type !== 'confirmation' })}
            styleWhenEnabled={danger ? tw`bg-error dark:bg-dark-error` : undefined}
            textColor={danger ? (tw`text-onError dark:text-dark-onError`.color as string) : undefined}
          >
            {okText ?? 'Ok'}
          </ButtonTimer>
        </Dialog.Actions>
      )}
    </Dialog>
  );
};
export default DialogConfig;

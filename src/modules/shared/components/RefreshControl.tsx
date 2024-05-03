import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const AppRefreshControl = memo(
  ({ refreshing: refreshingProp, onRefresh: onRefreshProp, ...props }: RefreshControlProps) => {
    const theme = useTheme();

    const [refreshing, setRefreshing] = useState(refreshingProp);
    const [firstRender, setFirstRender] = useState(true);
    const colors = useMemo(() => [theme.colors.primary], [theme.colors.primary]);

    useEffect(() => {
      //TODO: issue https://github.com/facebook/react-native/issues/25898
      const timeout = setTimeout(() => setFirstRender(false), 100);
      return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
      setRefreshing(refreshingProp);
    }, [refreshingProp]);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      onRefreshProp?.();
    }, [onRefreshProp]);
    return (
      <RefreshControl
        {...props}
        progressBackgroundColor={theme.dark ? theme.colors.elevation.level5 : theme.colors.elevation.level1}
        tintColor={theme.colors.primary}
        refreshing={firstRender ? false : refreshing}
        onRefresh={onRefresh}
        colors={colors}
      />
    );
  }
);

export default AppRefreshControl;

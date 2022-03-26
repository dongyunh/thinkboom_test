import { useAppSelector } from '../redux/hooks';
import { selectDarkMode } from '../redux/modules/darkMode';

export function useTheme() {
  const darkModeState = useAppSelector(selectDarkMode);
  const theme = (() => {
    if (darkModeState.systemTheme === 'not-ready') return 'light';
    if (darkModeState.theme !== 'default') return darkModeState.theme;
    return darkModeState.systemTheme;
  })();

  return theme;
}

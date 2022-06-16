import { extendTheme } from 'native-base'
import { Text } from './Text'

const colors = {
  bgColor: '#263038',
  lightgrey: '#ADADAD',
  mediumGrey: '#A1A1A1',
  green: '#7DAA4A',
  red: '#E53B15',
  gold: '#BBB471',
  white: '#fff'
}

const fontConfig = {
  Roboto: {
    300: {
      normal: 'Roboto-Light',
      italic: 'Roboto-LightItalic',
    },
    400: {
      normal: 'Roboto_400Regular',
      italic: 'Roboto-Italic',
    },
    500: {
      normal: 'Roboto_500Medium',
    },
  },
  Rubik: {
    300: {
      normal: 'Rubik-Light',
      italic: 'Rubik-LightItalic',
    },
    400: {
      normal: 'Rubik_400Regular',
      italic: 'Rubik-Italic',
    },
    500: {
      normal: 'Rubik_500Medium',
    },
    600: {
      normal: 'Rubik_700Bold',
      italic: 'Rubik-MediumItalic',
    },
  },
}

const fonts = {
  rubik: 'Rubik',
  roboto: 'Roboto',
}

const customTheme = {
  fontConfig,
  fonts,
  colors,
  components: {
    Text: Text
  }
}

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default extendTheme(customTheme)

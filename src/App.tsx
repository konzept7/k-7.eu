import './App.css'
import Layout from './components/Layout/Layout'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import '@fontsource/karla';
import '@fontsource/kufam';
import "@fontsource/krub"
import '@fontsource/karla/300.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/500.css';
import '@fontsource/karla/600.css';
import '@fontsource/karla/700.css';
import '@fontsource/kufam/400.css';
import '@fontsource/kufam/700.css';
import '@fontsource/kufam/900.css';
import "@fontsource/krub/200.css"
import "@fontsource/krub/300.css"
import "@fontsource/krub/400.css"
import "@fontsource/krub/500.css"
import "@fontsource/krub/700.css"

import "./i18n"

import { useState } from 'react';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const prefferedTheme = userPrefersDark ? 'dark' : 'light'
  const [colorScheme, setColorScheme] = useState<ColorScheme>(prefferedTheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{
      colorScheme: 'dark',
      fontFamily: 'Karla, sans-serif',
      headings: {
        fontFamily: 'Kufam, sans-serif',
      },
      dateFormat: 'dd. MM. yyyy',
      loader: 'bars',
      datesLocale: "de",
      colors: { brand: ['#eaedf0', '#c4cbd4', '#9faab8', '#79899c', '#546881', '#2e4765', '#263a53', '#1d2d41', '#15202D', '#0E151E',], shade: ['rgb(221 221 221)'] },
      black: '#0E151E',
      white: '#fff',
      components: {
        Paper: {
          defaultProps: {
            withBorder: true,
            radius: 'md',
          }
        },
        TextInput: {
          // Subscribe to theme and component params
          styles: (theme) => ({
            input: {
              backgroundColor: '#090e15'
            },
          }),
        },
        Textarea: {
          // Subscribe to theme and component params
          styles: (theme) => ({
            input: {
              backgroundColor: '#090e15'
            },
          }),
        },

      }
    }}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <NotificationsProvider>
          <Layout />
        </NotificationsProvider>
      </ColorSchemeProvider>
    </MantineProvider>
  )
}

export default App

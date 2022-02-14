import React from 'react'
import { configure } from 'mobx'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from '~/App'
import { StoreContext } from '~/context'
import RootStore from '~/store/modules/RootStore'
import theme from '~/theme'

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
// Base Styling
import '~/styles/index.scss'
// Utils
import createGlobalAutoRuns from './utils/services/autoruns'

configure({
  // Good practice for default batching
  reactionScheduler: (fn: () => void) => {
    setTimeout(fn, 1)
  },
  enforceActions: 'never',
})

Sentry.init({
  dsn: process.env.SENTRY_URL,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: Number(process.env.SENTRY_SAMPLE_RATE),
});

export const store = new RootStore()

createGlobalAutoRuns(store)

// Вынести куда-нибудь в другое место
Cookies.set(process.env.API_TOKEN_KEY, process.env.API_TOKEN_VALUE)

render(
  <React.StrictMode>
    <CssBaseline />
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </StoreContext.Provider>
  </React.StrictMode>,
document.getElementById('root'));
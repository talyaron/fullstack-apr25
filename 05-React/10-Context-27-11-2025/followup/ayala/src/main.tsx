import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from './model/ThemeProvider.tsx'
import {NameProvider} from './model/NameProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <NameProvider>
        <App />
      </NameProvider>
    </ThemeProvider>
  </StrictMode>,
)

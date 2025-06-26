import '../../global_components/global.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { configureStore } from '@reduxjs/toolkit'
import FinRed from '../../states/finance-data/finReducer.tsx'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    finance: FinRed
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

//following 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
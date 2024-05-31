import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router}>
              </RouterProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)

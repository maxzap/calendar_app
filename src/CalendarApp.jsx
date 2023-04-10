import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      /** Usar HashRouter en lugar de BrowserRouter para resolver el problema de accesos a lugares no definidos cuando no tenemos control sobre las rutas */
      {/* <HashRouter> */}
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
      {/* </HashRouter> */}
    </Provider>
  )
}

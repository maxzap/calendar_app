import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  
  // const authStatus = 'not-authenticated';
  //const authStatus = 'not-authenticated';

  /* los useEffect siempre tienen que estar
  declarados antes de una condicion */

  useEffect(() => {
    checkAuthToken();

    // No necesito ninguna funcion de limpieza
    // return () => {
    //   second
    // }
  }, [
    // Y tampoco necesito una dependencia.
    // third
  ])
  

  if( status === 'checking' ) {
    return <h3>Cargando..</h3>;
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? <Route path="/auth/*" element={ <LoginPage /> }  />
          : <Route path="/*" element={ <CalendarPage /> }  />
      }
      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}

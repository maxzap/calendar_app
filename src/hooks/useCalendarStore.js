import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) );
    };
    /*  En este ejemplo no vamos a utilizar thunks. En lugar de eso vamos disparar acciones sicronas */

    const startSavingEvent = async( calendarEvent ) => {
      // TODO: llegar al backend 

      // todo: todo bien
      

      try {
        
          if ( calendarEvent.id ) {
            // Actualizando
            await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
            dispatch( onUpdateEvent( calendarEvent, user ) );
            return;    
          }
          // Creando
    
          const { data } =  await calendarApi.post('/events', calendarEvent);
          dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
    
      } catch (error) {
        console.log(error);

        Swal.fire('Error al guardar', error.response.data.msg, 'error');
        
      }
    }

    const startDeletingEvent = async() => {
      // TODO: llegar al backend

      try {
        await calendarApi.delete(`/events/${ activeEvent.id }`);
        // todo: todo bien
        dispatch( onDeleteEvent() );
        
      } catch (error) {
        console.log(error)
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');
      }


    }
    /* Donde mandamos a llamar la carga de eventos? Podriamos usar un useEffect para cargarlos,
    pero siendo un compoente que se utililza en varios lugares eso represente un problema. 
    Por eso exportamos la funcion de startLoadingEvents para dispararla con useEffect directamente
    en el componente de CalendarPage cada vez que se inicie.*/
    const startLoadingEvents = async () => {
      try {
        const { data } = await calendarApi.get('/events');
        const events = convertEventsToDateEvents( data.eventos );
        dispatch( onLoadEvents( events ) );
        console.log(events);
      } catch (error) {
        console.log('Error cargando eventos');
        console.log(error);
        
      }
    }

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,



    //* Metodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}

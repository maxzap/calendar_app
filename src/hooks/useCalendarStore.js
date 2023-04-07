import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

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
      
      if ( calendarEvent._id ) {
        // Actualizando
        dispatch( onUpdateEvent( calendarEvent ) );
      } else {
        // Creando

        const { data } =  await calendarApi.post('/events', calendarEvent);
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );

      }
    }

    const startDeletingEvent = async() => {
      // TODO: llegar al backend 

      // todo: todo bien
      dispatch( onDeleteEvent() );

    }
    /* Donde mandamos a llamar la carga de eventos? Podriamos usar un useEffect para cargarlos,
    pero siendo un compoente que se utililza en varios lugares eso represente un problema. 
    Por eso exportamos la funcion de startLoadingEvents para dispararla con useEffect directamente
    en el componente de CalendarPage cada vez que se inicie.*/
    const startLoadingEvents = async () => {
      try {
        const { data } = await calendarApi.get('/events');
        const events = convertEventsToDateEvents( data.eventos );
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

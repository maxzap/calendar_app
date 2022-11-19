import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {
        events,
        activeEvent,

    } = useSelector( state => state.calendar );

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
        dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );

      }
    }

    const startDeletingEvent = async() => {
      // TODO: llegar al backend 

      // todo: todo bien
      dispatch( onDeleteEvent() );

    }

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,



    //* Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  }
}

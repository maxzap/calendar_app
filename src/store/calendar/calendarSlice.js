import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//    id: new Date().getTime(),
//    title: 'Cumpleaños de Eli',
//    notes: 'Hay que comprar la torta',
//    start: new Date(),
//    end: addHours( new Date(), 2 ),
//    bgColor: '#fafafa',
//    user: {
//      id: '123',
//      name: 'Max'
//    }
//  };


export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      isLoadingEvents: true,
      events: [
         // tempEvent
      ],
      activeEvent: null
   },
   reducers: {
      onSetActiveEvent: ( state, { payload }) => {
         state.activeEvent = payload;
      },
      onAddNewEvent: ( state, { payload } ) => {
         state.events.push( payload );
         state.activeEvent = null;
      },
      onUpdateEvent: ( state, { payload } ) => {
         state.events = state.events.map( event => {
            if ( event.id === payload.id ) {
               return payload;
            }
            return event;
         });
      },
      onDeleteEvent: ( state ) => {
         if ( state.activeEvent ) {
            state.events = state.events.filter( event => event.id !== state.activeEvent.id );
            state.activeEvent = null;
         }
      },
      onLoadEvents: ( state, { payload = [] }) => {
         state.isLoadingEvents = false;
         // state.events = payload;

         /** vamos a realizar una carga de eventos en el store validando que el mismo no se encuentre
          * actualmente.
          */
         payload.forEach( event => {
            /** acá podria utilizar la funcion find (pero esta retorna un objeto) o podria
             * usar el some que regresa un valor booleano si lo encuentra
             */
            const exists = state.events.some( dbEvent => dbEvent.id === event.id );
            if ( !exists ) {
               state.events.push( event );
            }
         })
      },
      onLogoutCalendar: ( state ) => {
         state.isLoadingEvents = true;
         state.events      = [];
         state.activeEvent = null;
      }
   }
});


// Action creators are generated for each case reducer function
export const {
   onAddNewEvent,
   onDeleteEvent,
   onLoadEvents,
   onLogoutCalendar,
   onSetActiveEvent,
   onUpdateEvent
} = calendarSlice.actions;

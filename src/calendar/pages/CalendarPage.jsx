import { Calendar } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete } from "../"

import { localizer, getMessagesES } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    /** Creacion de un evento con colores definidos */
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }    
  }
  
  const onDoubleClick = ( event ) => {
    // console.log({ onDoubleClick: event });
    openDateModal();
  }
  
  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  }
  

  useEffect(() => {
    startLoadingEvents()
  }, [])
    
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
    
  )

}

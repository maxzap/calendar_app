import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

// ayuda a sobreponer sobre todo, el valor se saca de un elemento que se encuentra en index.html
// este valor puede que sea diferente dependiendo del generador de paquetes
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen( false );
    }


  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1>Hola Mundo</h1>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in illo dolore debitis consectetur vitae amet aspernatur sit laboriosam similique, expedita nostrum maxime magni sint accusamus at ad beatae quos!</p>
    </Modal>
  )
}

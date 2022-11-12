/* hook para manejar y hacer dispatch de acciones y manejar todo lo que este relacionado uiStore */

import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const {
        isDateModalOpen,
        isDateModalClose
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal();
    }

    return {
        //* Propiedades
        isDateModalOpen,
        isDateModalClose,

        // *Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }


}
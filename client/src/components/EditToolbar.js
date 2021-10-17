import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        if(!editStatus){
            store.undo();
        }
        
    }
    function handleRedo() {
        if(!editStatus){
            store.redo();
        }
    }
    function handleClose() {
        if(!editStatus){
            history.push("/");
            store.closeCurrentList();
        } 
    }
    let editStatus = false;
    if ((store.isListNameEditActive !== "-1") || (store.isItemEditActive !== -1)) {
        editStatus = true;
    }
    
    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={enabledButtonClass}
                style={(store.canUndo && !editStatus) ? {} : {opacity: 0.5, cursor: "not-allowed"}}
                >
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={enabledButtonClass}
                style={(store.canRedo && !editStatus) ? {} : {opacity: 0.5, cursor: "not-allowed"}}
                >
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={enabledButtonClass}
                style={(store.currentList === null || editStatus) ? {opacity: 0.5, cursor: "not-allowed"} : {}}
                >
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;
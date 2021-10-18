import { React, useContext, useState, useEffect} from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(store.isItemEditActive === props.index);
    const [ text, setText ] = useState(props.text);
    const [draggedTo, setDraggedTo] = useState(0);

    useEffect(() => {
        store.updateCurrentList();
        store.setCurrentList(store.currentList._id);
    }, []);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);
        // setText(store.currentList.item[targetId]);
        // UPDATE THE LIST
        
        if(sourceId !== targetId){
            store.addMoveItemTransaction(sourceId, targetId);
            
        }

    }

    function handleToggleEdit(event) {

        event.stopPropagation();
        setText(props.text);
        toggleEdit();
    }

    function toggleEdit() {
        
        const active = (store.isItemEditActive === props.index);
        // console.log("NEWACTIVE: "+newActive)
        // console.log("EDITACTIVE: "+editActive)
        // console.log(store.isItemEditActive);
        if (active) {
            store.setIsItemEditActive(-1);
            setEditActive(false);
        }
        else{
            store.setIsItemEditActive(props.index);
            setEditActive(true);
        }
        // console.log(store.isItemEditActive);
        
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(text !== props.text){
                store.addChangeItemTransaction(index, props.text, text);
            }
            handleToggleEdit(event);
         }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
        
    }

    let { index } = props;
    // console.log(props.index)
    // console.log("ITEM EDIT: "+store.isItemEditActive)
    // console.log(props.index === store.isItemEditActive)
    let itemClass = "top5-item";
    
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    // let itemStatus = false;
    // if (store.isItemEditActive) {
    //     itemStatus = true;
    // }
    let itemElement =
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                disabled={!(store.isItemEditActive === props.index) && (store.isItemEditActive !== -1)}
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleToggleEdit}
                // style={d ? {opacity: 0.5} : {}}
                value={"\u270E"}
            />
            {props.text}
        </div>;
    if (editActive) {
        
        itemElement =
            <input
                id={"item-" + (index + 1)}
                className={itemClass}
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={props.text}
            />;
    }
    return (
        itemElement
    );
}

export default Top5Item;
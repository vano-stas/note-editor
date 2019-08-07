import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NoteList from '../note-list';
import NoteForm from '../note-form';
import SearchPanel from '../search-panel';
import EditModal from '../edit-modal';


import './app.scss';

function App () {

    const dataTXT = localStorage.getItem("state-note");
    const data = JSON.parse(dataTXT);

    const initState = data || [];

    const initStateForm = {
        text: '',
        id: null,
        tags: []
    }

    const [stateNote, setStateNote] = useState(initState);
    const [stateForm, setStateForm] = useState(initStateForm);
    const [term, setTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [stateEditNote, setStateEditNote] = useState([]);

    useEffect(() => {
        let elem = JSON.stringify(stateNote);
        window.localStorage.setItem("state-note", elem );
    },[stateNote]);

    const addNote = (value) => {
        value.id = stateNote.length + 1;
        const tagArr = findTags(value.text) || [];
        const tagFull = tagArr.map((item, i) => {
             return item = { text: item, tagId: i + 1 }
        })
        value.tags = tagFull;
        setStateNote ([...stateNote, value]);
        setStateForm(initStateForm);
    }

    const findTags = (text) => {
        const tagReg = new RegExp(/(#[\S]*)/gim);
        const res = text.match(tagReg);
        return res;
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setStateForm({...stateForm, [name]:value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (e.keyCode === 13) {
            addNote(stateForm);
        }
    }

    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            addNote(stateForm);
        }
    }

    const handleEnterTag = (id, e) => {
        const value = e.target.value;
        if (e.keyCode == 13) {
            addTag(id, value);
            e.target.value = "";
            e.target.blur();
        }
        if (e.keyCode == 32) {
            e.nativeEvent.returnValue = false;
        }
    }

    const addTag = (id, value) => {
        const index = stateNote.findIndex((el) => el.id === id);
        const newState = stateNote;
        const tagIndex = newState[index].tags.length + 1;
        newState[index].tags = [...newState[index].tags, {text:value, tagId: tagIndex}]
        setStateNote([... newState]);
    }

    const focusInputTag = (e) => {
        if (e.target.nodeName == 'DIV') {
            e.target.lastChild.focus();
            e.target.lastChild.value = "#"
        }
    }

    const deleteTag = ( tagId, id) => {
        const noteItem = stateNote.filter((el)=> { return el.id === id});
        const index = stateNote.findIndex((el) => el.id === id);
        const indexTag = noteItem[0].tags.findIndex((el) => el.tagId === tagId);
        const newArrTag = [
            ...noteItem[0].tags.slice(0, indexTag),
            ...noteItem[0].tags.slice(indexTag +1 )
        ];
        noteItem[0].tags = newArrTag;
        const newArr = stateNote;
        newArr[index] = noteItem[0];
        setStateNote([...newArr]);
    }

    const deleteNote = (id) => {
        const index =stateNote.findIndex((el) => el.id === id);
        const newArr = [
            ...stateNote.slice(0, index),
            ...stateNote.slice(index +1 )
        ];
        setStateNote([...newArr]);
    }

    const editNote = (id, value) => {
        const index =stateNote.findIndex((el) => el.id === id);
        const newArr = stateNote;
        const newItem = {};
        newItem.text = value;
        newItem.id = id;
        const tagArr = findTags(value) || [];
        const tagFull = tagArr.map((item, i) => {
             return item = { text: item, tagId: i + 1 }
        })
        newItem.tags = tagFull;
        newArr[index] = newItem;
        setStateNote ([...newArr]);
        setShowEditModal(!showEditModal);
    }

    const onToggleEdit = (id) => {
        const index =stateNote.findIndex((el) => el.id === id);
        setStateEditNote(stateNote[index]);
        setShowEditModal(!showEditModal);
    }

    const onToggleEditModal = (e) => {
        e.stopPropagation();
        if (e.target.className == 'edit-modal-wrapper') {
            setShowEditModal(!showEditModal);
        } else return null;
    }

    const onToggleClose = (e) => {
        setShowEditModal(!showEditModal);
    }

    const handleSubmitEdit = (id, e) => {
        e.preventDefault();
        const value = e.target.value;
        if (e.keyCode === 13) {
            editNote(id, value);
        }
    }

    const handleEnterEdit = (id, e) => {
        const value = e.target.value;
        if (e.keyCode == 13) {
            editNote(id, value);
        }
    }

    const lostFocus = (e) => {
        e.target.value = "";
    }

    const hasFocus = (e) => {
        e.target.value = "#";
    }

    const editModal = showEditModal
    ? ReactDOM.createPortal( <EditModal
        stateEditNote={stateEditNote}
        handleEnterEdit={handleEnterEdit}
        handleSubmitEdit={handleSubmitEdit}
        onToggleEditModal={onToggleEditModal}
        onToggleClose={onToggleClose}
         />,
        document.getElementById('modal'))
    : null;

    //-----------------search

    const onSearchChange = (e) => {
        setTerm(e.target.value);
    }

    const search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        const res = items.filter((item) => {
            return item.tags.length > 0
        });
        const tagRes = res.filter((item, i) => {
            const items = item.tags.filter(item => {
                return item.text.toLowerCase().indexOf(term.toLowerCase()) > -1;
            });
            if (items[0] !== undefined) {
                 return res[i]
             }
        })
        return tagRes;
    }

    const visibleItems = search(stateNote, term);

    //---------------end search

   return (
    <div className="app">
        {editModal}
        <NoteForm 
            handleEnter={handleEnter}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            stateForm={stateForm}
         />
        <SearchPanel 
            onSearchChange={onSearchChange} />
       <NoteList
            stateNote={visibleItems}
            focusInputTag={focusInputTag}
            deleteTag={deleteTag}
            handleEnterTag={handleEnterTag}
            deleteNote={deleteNote}
            onToggleEdit={onToggleEdit}
            lostFocus={lostFocus}
            hasFocus={hasFocus}
             />
    </div>
   )
}

export default App;
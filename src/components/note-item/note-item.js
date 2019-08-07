import React from 'react';
import NoteItemTag from '../note-item-tag';

import './note-item.scss';

function NoteItem ({ stateNote, focusInputTag, deleteTag, handleEnterTag, stateTag, deleteNote, onToggleEdit, lostFocus, hasFocus }) {

    return (
        stateNote.map((note) => {
            return (
                <div className="card note-item-wrapper" key={note.id}>
                    <div className="card-body d-flex">
                        <p className="card-text flex-grow-1">{note.text}</p>
                        <div className='d-flex flex-row align-items-start'>
                            <button type='button' className='btn btn-outline-danger p-1 mr-2'
                                onClick={() => deleteNote(note.id)} >
                                <i className="fa fa-trash m-1"></i>
                            </button>
                            <button type='button' className='btn btn-outline-info p-1'
                            onClick={() => onToggleEdit(note.id)}>
                                <i className="fa fa-edit m-1    "></i>
                            </button>
                        </div>
                    </div>
                    <NoteItemTag note={note}
                        focusInputTag={focusInputTag}
                        deleteTag={deleteTag}
                        handleEnterTag={handleEnterTag}
                        stateTag={stateTag}
                        lostFocus={lostFocus}
                        hasFocus={hasFocus} />
                </div>
            )
        })
    );
}

export default NoteItem;
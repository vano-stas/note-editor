import React from 'react';

import './note-item-tag.scss';

function NoteItemTag ({ note, focusInputTag, deleteTag, handleEnterTag, lostFocus, hasFocus }) {

    return (
        <div className="card-footer p-2"
            onClick={focusInputTag} >
            {note.tags.map((item) => {
            return <span className='badge badge-success m-1 p-1' key={item.tagId}>
                {item.text}
                <button type="button" className="btn m-0 p-0" aria-label="Close"
                    onClick={() => deleteTag( item.tagId, note.id)} >  
                    <span aria-hidden="true">&times;</span>
                </button>
            </span>})}
            <input className='input-tag' type="text" name={note.id}
                onKeyDown={(e) => handleEnterTag(note.id, e)}
                onBlur={lostFocus}
                onFocus={hasFocus}
                 />
        </div>
    )
}

export default NoteItemTag;
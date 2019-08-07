import React from 'react';
import NoteItem from '../note-item';

import './note-list.scss';

function NoteList ({ stateNote, focusInputTag, deleteTag, handleEnterTag, stateTag, deleteNote, onToggleEdit, lostFocus, hasFocus }) {

    return (
        <div className='note-list-wrapper'>
            <NoteItem
                stateNote={stateNote}
                focusInputTag={focusInputTag}
                deleteTag={deleteTag}
                handleEnterTag={handleEnterTag}
                stateTag={stateTag}
                deleteNote={deleteNote}
                onToggleEdit={onToggleEdit}
                lostFocus={lostFocus}
                hasFocus={hasFocus} />
        </div>
    )
}

export default NoteList;
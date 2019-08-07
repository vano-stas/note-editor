import React from 'react';

import './note-form.scss';

function NoteForm ({ handleSubmit, handleEnter, handleInputChange, stateForm }) {
    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input type="text" name='text' className="form-control" value={stateForm.text}
                placeholder="Type here text"
                onKeyDown={handleEnter} onChange={handleInputChange}/>
        </form>
    )
}

export default NoteForm;
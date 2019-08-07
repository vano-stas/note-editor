import React from 'react';

import './edit-modal.scss';

function EditModal ({ stateEditNote, handleEnterEdit, handleSubmitEdit, onToggleEditModal, onToggleClose }) {

    return (
        <div className="edit-modal-wrapper" onClick={onToggleEditModal} >
            <div className="edit-modal-content card" >
                <form className='edit-form' onSubmit={(e) => handleSubmitEdit(stateEditNote.id, e)}>
                    <input type="text" name='edit' defaultValue={stateEditNote.text}
                    className='form-control edit-input' 
                    onKeyDown={(e) => handleEnterEdit(stateEditNote.id, e)}
                    />
                 </form>
            </div>
            <button type="button" className="btn btn-outline-dark button-close" aria-label="Close" 
                onClick={onToggleClose} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default EditModal;
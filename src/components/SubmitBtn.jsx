import React from 'react'
import { Spinner } from 'react-bootstrap'

export const SubmitBtn = ({variant='dark', loading=false, icon='bi-floppy', text='Save' }) => {
  return (
    <>
    <button type="submit" variant="dark" 
    disabled={loading}>
        {loading? <Spinner size="sm" variant={variant} className="me-2"/> : 
        <i className={`{icon} me-2`}></i>}{text}</button>
        
        </>
  )
}

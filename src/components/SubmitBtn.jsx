import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export const SubmitBtn = ({variant='dark', loading=false, icon='bi-floppy', text='Save' }) => {
  return (
    <>
    <Button type="submit" variant="dark" 
    disabled={loading}>
        {loading? <Spinner size="sm" variant={variant} className="me-2"/> : 
        <i className={`${icon} me-2`}></i>}{text}</Button>
        
        </>
  )
}

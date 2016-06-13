import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick, flippable }) => {
  if (active) {
    return <span className="redux-link">{children}</span>
  }

  return (
    <a className="redux-link" href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link

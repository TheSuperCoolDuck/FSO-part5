import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visable, setVisable] = useState(false)

  const hideWhenVisable = { display: visable ? 'none' : '' }
  const showWhenVisable = { display: visable ? '' : 'none' }

  const toggleVisibility = () => {
    setVisable(!visable)
  }

  return (
    <div>
      <div style={hideWhenVisable}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes={
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
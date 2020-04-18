import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

type RenderingProps = {
  setRender3d: Function
}

const RenderingSwitch = (props: RenderingProps) => {
  
  const {setRender3d} = props
  const [state, setState] = React.useState({
    checkedA: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.checked

    setState({...state, [event.target.name]: event.target.checked})

    setRender3d(val)
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Rendering in 3D"
      />
    </FormGroup>
  )
}

export default RenderingSwitch

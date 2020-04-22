import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

type RenderingProps = {
  setRender3d: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: theme.spacing(1),
      padding: '1em'
    }
  })
)
const RenderingSwitch = (props: RenderingProps) => {
  const classes = useStyles()
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
    <FormGroup className={classes.form}>
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Rendering in 3D"
      />
    </FormGroup>
  )
}

export default RenderingSwitch

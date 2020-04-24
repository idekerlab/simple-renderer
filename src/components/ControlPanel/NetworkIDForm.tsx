import React, {useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
)

const NetworkIDForm = (props) => {
  const classes = useStyles()

  const [uuid, setUUID] = useState('')

  const {setSelectedNetwork} = props

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change...', event.target.value)
    setUUID(event.target.value)
  }

  const _handleLoad = (event) => {
    console.log('Loading...', event)
    if (uuid !== '') {
        console.log('UUID...', uuid)
      setSelectedNetwork(uuid)
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Or UUID (in CX2)"
        variant="outlined"
        size="small"
        onChange={_handleChange}
      />
      <Button variant="contained" color="primary" onClick={_handleLoad}>
        Load
      </Button>
    </form>
  )
}

export default NetworkIDForm

import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      padding: '1em'
    //   minWidth: '10em'
    },
    selectEmpty: {
    //   marginTop: theme.spacing(2)
    }
  })
)

type Samples = {
  name: string
  suid: string
}

type SelectorProps = {
  selectedNetwork: string
  setSelectedNetwork: Function
  exampleNetworks: Samples[]
} & typeof defaultProps

const PRESETS = [
  {name: 'SMALL', suid: 'e065fc7d-7823-11ea-8057-525400c25d22'},
  {name: 'MEDIUM', suid: 'f500ed57-77c6-11ea-8057-525400c25d22'},
  {name: 'LARGE', suid: 'f00fa512-7dd3-11ea-8503-525400c25d22'}
]

const defaultProps = {
  exampleNetworks: PRESETS
}

const ExampleSelector = (props: SelectorProps) => {

  const classes = useStyles()

  const {selectedNetwork, setSelectedNetwork, exampleNetworks} = props

  const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
    const value = event.target.value as string
    setSelectedNetwork(value)
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="sample-selector">Example Networks</InputLabel>
      <Select value={selectedNetwork} onChange={handleChange}>
        {exampleNetworks.map((entry) => {
          return (
            <MenuItem key={entry.suid} value={entry.suid}>
              {entry.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

ExampleSelector.defaultProps = defaultProps

export default ExampleSelector

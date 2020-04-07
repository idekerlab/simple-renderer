import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EFEFEF',
      width: '40%',
      maxWidth: '20em',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '1em'
    }
  })
)

type ControlProps = {
  selectedNode?: object
}

const ControlPanel = (props: ControlProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
          {props.selectedNode}
      </Typography>
    </div>
  )
}

export default ControlPanel

import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import {createStyles, Theme, makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import NodeView from '../../model/NodeView'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EFEFEF',
      width: '40%',
      maxWidth: '20em',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      padding: '1em'
    },
    list: {
      paddingTop: '1em',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
)

type ControlProps = {
  selectedNode?: NodeView
}

const ControlPanel = (props: ControlProps) => {
  const classes = useStyles()

  const {label, id} = props.selectedNode

  console.log('props.', props.selectedNode)
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">Large Graph Renderer Demo</Typography>

      <Divider />

      <Typography variant="body2" color="textSecondary" align="center">
        Selected Node: {props.selectedNode.color}
      </Typography>

      <List className={classes.list}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            N
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={label} secondary={`ID: ${id}`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            E
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Edge" secondary={`Label`} />
      </ListItem>
    </List>
    </div>
  )
}

export default ControlPanel

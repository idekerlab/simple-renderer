import React, {useState, useEffect} from 'react'

import {createStyles, Theme, makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import NodeView from '../../model/NodeView'
import EdgeView from '../../model/EdgeView'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#EFEFEF',
      width: '40%',
      maxWidth: '20em',
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      padding: '1em'
    },
    list: {
      paddingTop: '1em',
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    node: {
      backgroundColor: 'red'
    }
  })
)


const DEF_NV: NodeView = {
    id: '-',
    label: '-',
    position: [0,0,0]
}

const DEF_EV: EdgeView = {
    id: '-',
    s: '-',
    t: '-'
}

const defaultProps = {
  selectedNode: DEF_NV,
  selectedEdge: DEF_EV
}

type SelectedProps = {
  selectedNode?: NodeView | null
  selectedEdge?: EdgeView | null
} & typeof defaultProps


const SelectedObjectPanel = ( props: SelectedProps ) => {
  const classes = useStyles()
  const {selectedNode, selectedEdge} = props

  return (
    <List className={classes.list}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.node}>N</Avatar>
        </ListItemAvatar>
        <ListItemText primary={selectedNode.label} secondary={`ID: ${selectedNode.id}`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>E</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Edge" secondary={`Source: ${selectedEdge.s} Target: ${selectedEdge.t}`} />
      </ListItem>
    </List>
  )
}

SelectedObjectPanel.defaultProps = defaultProps

export default SelectedObjectPanel

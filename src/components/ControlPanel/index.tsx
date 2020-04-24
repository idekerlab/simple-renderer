import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import {createStyles, Theme, makeStyles} from '@material-ui/core/styles'

import NodeView from '../../model/NodeView'
import EdgeView from '../../model/EdgeView'

import RenderingSwitch from './RenderingSwitch'
import ExampleSelector from './ExampleSelector'
import NetworkIDForm from './NetworkIDForm'
import SelectedObjectPanel from './SelectedObjectPanel'



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

type ControlProps = {
  selectedNode?: NodeView,
  selectedEdge?: EdgeView,
  setRender3d: Function,
  selectedNetwork: string,
  setSelectedNetwork: Function
}

const ControlPanel = (props: ControlProps) => {
  const classes = useStyles()

  const { setRender3d, selectedNode, selectedEdge } = props

  console.log('props.', props.selectedNode)
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        Large Graph Renderer Demo
      </Typography>

      <Divider />

      <SelectedObjectPanel {...props} />

      <Divider />
      <ExampleSelector {...props}/>
      <NetworkIDForm {...props}/>
      <Divider />
      <RenderingSwitch setRender3d={setRender3d} />
    </div>
  )
}

export default ControlPanel

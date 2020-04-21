import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView, OrbitView} from '@deck.gl/core'
import GraphLayer from '../../Layers/GraphLayer'
import GraphView from '../../model/GraphView'

const baseStyle = {
  backgroundColor: '#222222',
  position: 'relative'
}

const MAIN_VIEW_ID = 'deck-main-view'
const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  zoom: -4,
  minZoom: -10,
  maxZoom: 10
}

type RendererProps = {
  setSelectedNode: Function,
  graphView: GraphView| null,
  render3d: boolean
}

/**
 * Base component for large graph rendering using Deck.gl
 */
const GraphRenderer = (props:RendererProps) => {
  const {setSelectedNode, graphView, render3d} = props

  // UI states
  const [showEdges, setShowEdges] = useState(true)
  const [showLabels, setShowLabels] = useState(false)

  const _handleViewStateChange = (state) => {
    const {viewState, interactionState} = state
    const {zoom} = viewState
    const {isZooming} = interactionState

    console.log('Zoom level = ', zoom)
    if(zoom>1) {
      setShowLabels(true)
    } else {
      setTimeout(() => {
        if (showLabels) {
          setShowLabels(false)
        }
      }, 100)


    }

    if (isZooming) {
      setShowEdges(false)
      setTimeout(() => {
        if (showEdges !== false) {
          setShowEdges(true)
        }
      }, 300)
    } else {
    }
  }


  const layerProps = {graphView, setSelectedNode, showEdges, showLabels, render3d}
  const layers = [new GraphLayer(layerProps)]
  let view = new OrthographicView()
  if(render3d) {
    view = new OrbitView()
  }

  return (
    <DeckGL
      width="100%"
      height="100%"
      style={baseStyle}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      views={view}
      layers={layers}
      onDragStart={(info) => {
        setShowEdges(false)
      }}
      onDragEnd={(info) => {
        setShowEdges(true)
      }}
      onViewStateChange={(state) => {
        _handleViewStateChange(state)
      }}
    />
  )
}

export default GraphRenderer

import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView} from '@deck.gl/core'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'
import GraphLayer from '../../Layers/GraphLayer'

const baseStyle = {
  backgroundColor: '#000000',
  position: 'relative'
}

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  zoom: 0,
  minZoom: -10,
  maxZoom: 10
}

const view = new OrthographicView()

type RendererProps = {
  setSelectedNode: Function,
  data: object  
}

/**
 * Base Deck layer
 */
const GraphRenderer = (props:RendererProps) => {
  const {setSelectedNode, data} = props

  // UI states
  const [showEdges, setShowEdges] = useState(true)

  const _handleViewStateChange = (state) => {
    const {viewState, interactionState} = state
    const {zoom} = viewState
    const {isZooming} = interactionState

    if (isZooming) {
      setShowEdges(false)
      setTimeout(() => {
        if (showEdges !== false) {
          setShowEdges(true)
        }
      }, 500)
    } else {
    }
  }

  // Return empty page if data is not available.
  if (data.nodeViews.size === 0) {
    return <div />
  }

  const layers = [new GraphLayer({data, setSelectedNode, showEdges})]

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

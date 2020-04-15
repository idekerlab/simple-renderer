import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView, OrbitView} from '@deck.gl/core'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'
import GraphLayer from '../../Layers/GraphLayer'

const baseStyle = {
  backgroundColor: '#222222',
  position: 'relative'
}

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  zoom: 0,
  minZoom: -10,
  maxZoom: 10
}


type RendererProps = {
  setSelectedNode: Function,
  data: object,
  render3d: boolean
}

/**
 * Base Deck layer
 */
const GraphRenderer = (props:RendererProps) => {
  const {setSelectedNode, data, render3d} = props
  

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
      }, 300)
    } else {
    }
  }

  // Return empty page if data is not available.
  if (data.nodeViews.size === 0) {
    return <div />
  }

  const layers = [new GraphLayer({data, setSelectedNode, showEdges, render3d})]
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

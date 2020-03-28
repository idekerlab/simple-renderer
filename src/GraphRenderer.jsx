import React from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView} from '@deck.gl/core'

import {createPoints, getLinks } from './graph-util'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  zoom: 1
}

const baseStyle = {
  backgroundColor: '#000000',
  position: 'relative'
}

const nodeCount = 10000000
const edgeCount = 100000
const nodes = createPoints(nodeCount)
const edges = getLinks(nodeCount, edgeCount, nodes)

const nodeLayer = new ScatterplotLayer({
  data: nodes,
  getPosition: d => d,
  getColor: [0, 255, 0],
  getRadius: 10,
  opacity: 1
})

const edgeLayer = new LineLayer({
  id: `link-layer`,
  data: edges,
  getSourcePosition: e => nodes[e[0]],
  getTargetPosition: e => nodes[e[1]],
  getColor: [200,200,200],
  strokeWidth: 0.1,
  opacity: 1
})

const GraphRenderer = props => {

  return (
    <DeckGL
      width="100%"
      height="100%"
      style={baseStyle}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      views={new OrthographicView()}
      layers={[edgeLayer, nodeLayer]}
    />
  )
}

export default GraphRenderer

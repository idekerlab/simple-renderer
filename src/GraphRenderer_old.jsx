import React from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView} from '@deck.gl/core'

import {createPoints, getLinks, generateColor} from './graph-util'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'

import * as sampleGraph from './sample-data/pc.json'

const originalNodes = sampleGraph.default.elements.nodes
const originalEdges = sampleGraph.default.elements.edges

const nodeMap = new Map()

const convertNodes = nodes => {
  let idx = nodes.length
  const nodeArray = new Array(idx)

  while (idx--) {
    const node = nodes[idx]
    nodeArray[idx] = [node.position.x, node.position.y]
    nodeMap.set(node.data.id, idx)
  }
  return nodeArray
}

const convertEdges = edges => {
  let idx = edges.length
  const edgeArray = []
  while (idx--) {
    if (idx % 100 === 0) {
      const edge = edges[idx]
      const source = edge.data.source
      const target = edge.data.target

      const e = [source, target]
      edgeArray.push(e)
    }
  }

  return edgeArray
}

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

const cxNodes = convertNodes(originalNodes)
const cxEdges = convertEdges(originalEdges)

const nodeLayer = new ScatterplotLayer({
  data: cxNodes,
  pickable: true,
  getPosition: d => [d[0], d[1]],
  getFillColor: d => [255, 255, 255],
  getRadius: 5,
  opacity: 1,
  onHover: ({object, x, y}) => {
    console.log('#HV', object)
  }
})

const _handleDragStart = info => {
  console.log('Start')
}

const _handleDragEnd = info => {
  console.log('End')
}

let showEdges = true

const edgeLayer = new LineLayer({
  id: `link-layer`,
  data: cxEdges,
  pickable: false,
  getSourcePosition: e => cxNodes[nodeMap.get(e[0])],
  getTargetPosition: e => cxNodes[nodeMap.get(e[1])],
  getColor: [250, 250, 220],
  strokeWidth: 0.1,
  opacity: 0.1
})

const GraphRenderer = props => {

  const layers = [nodeLayer]
  if(showEdges) {
    layers.push(edgeLayer)
  }

  console.log('Up:', layers)

  return (
    <DeckGL
      width="100%"
      height="100%"
      style={baseStyle}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      views={new OrthographicView()}
      layers={layers}
      onClick={info => {
        console.log('##Info base', info)
      }}
      onDragStart={info => {
        showEdges = false
        console.log('start', showEdges, info)
      }}
      onDragEnd={info => {
        showEdges = true
        console.log('End', showEdges, info)
      }}
    />
  )
}

export default GraphRenderer

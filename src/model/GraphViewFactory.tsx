import NodeView from './NodeView'
import EdgeView from './EdgeView'

import * as d3scaleChromatic from 'd3-scale-chromatic'
import * as d3color from 'd3-color'
import * as d3scale from 'd3-scale'

const tableau10 = d3scaleChromatic.schemeTableau10


const getRandomInt = (max: number) => {
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1))
}

const getColor = () => {
  const cHex = tableau10[getRandomInt(9)]
  const color = d3color.color(cHex)
  const c: [number, number, number] = [color.r, color.g, color.b]
  return c
}

const getEdgeColor = (score, mapper) => {
  const cHex = mapper(score)
  const color = d3color.color(cHex)
  const c: [number, number, number] = [color.r, color.g, color.b, 50]
  return c
}


const createNodeViews = (nodeData: []) => {
  let nodeCount: number = nodeData.length

  const nodeViewMap: Map<string, NodeView> = new Map()

  while (nodeCount--) {
    const node = nodeData[nodeCount]

    const {position, data} = node
    const {id, name} = data

    const nv: NodeView = {
      id,
      label: name,
      position,
      color: [255, 255, 255, 160],
      size: 5
    }

    nodeViewMap.set(id, nv)
  }

  return nodeViewMap
}

const createEdgeViews = (edges: []) => {
  let edgeCount: number = edges.length
  const edgeViewMap: Map<string, EdgeView> = new Map()

  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  while(edgeCount--) {
    const edge = edges[edgeCount]
    const score = edge.data.combined_score
    if(score < min) {
      min = score
    }

    if(score > max) {
      max = score
    }
  }

  console.log('MINMAX = ', min, max)
  const mapper = d3scale.scaleSequential(d3scaleChromatic.interpolateCividis).domain([min, max])
  edgeCount = edges.length

  while (edgeCount--) {
    const edge = edges[edgeCount]

    const {data} = edge
    const {id, source, target} = data

    const ev: EdgeView = {
      color: getEdgeColor(data.combined_score, mapper),
      width: 6,
      source,
      target
    }

    edgeViewMap.set(id, ev)
  }

  return edgeViewMap
}

export {createNodeViews, createEdgeViews}

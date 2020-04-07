import NodeView from './NodeView'
import EdgeView from './EdgeView'

import * as d3scaleChromatic from 'd3-scale-chromatic'
import * as d3color from 'd3-color'

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
const createNodeViews = (nodeData: []) => {
  let nodeCount: number = nodeData.length

  const nodeViewMap: Map<string, NodeView> = new Map()

  while (nodeCount--) {
    const node = nodeData[nodeCount]

    const {position, data} = node
    const {id} = data

    const nv: NodeView = {
      position,
      color: getColor(),
      shape: 'circle',
      size: 5
    }

    nodeViewMap.set(id, nv)
  }

  return nodeViewMap
}

const createEdgeViews = (edges: []) => {
  let edgeCount: number = edges.length
  const edgeViewMap: Map<string, EdgeView> = new Map()

  while (edgeCount--) {
    if (edgeCount % 2 === 0) {
      const edge = edges[edgeCount]

      const {data} = edge
      const {id, source, target} = data

      const ev: EdgeView = {
        color: [1, 0, 200],
        width: 1,
        opacity: 1,
        source,
        target
      }

      edgeViewMap.set(id, ev)
    }
  }

  return edgeViewMap
}

export {createNodeViews, createEdgeViews}

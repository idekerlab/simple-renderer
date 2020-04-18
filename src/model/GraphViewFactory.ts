import NodeView from './NodeView'
import EdgeView from './EdgeView'
import GraphView from './GraphView'

import * as d3scaleChromatic from 'd3-scale-chromatic'
import * as d3color from 'd3-color'
import * as d3scale from 'd3-scale'
import CyNode from './CyNode'
import CyEdge from './CyEdge'
import ViewModel from './ViewModel'

const tableau10 = d3scaleChromatic.schemeTableau10


class GraphViewFactory {
  static createGraphView = (nodeViews, edgeViews) => {

    const nvMap = createViewMap<NodeView>(nodeViews)
    const evMap = createViewMap<EdgeView>(edgeViews)

    const gv: GraphView = {
      nodeViews: nvMap,
      edgeViews: evMap
    }

    return gv
  }
}

const createNodeViewMap = (nodeViews: NodeView[]) => {
  const nodeViewMap = new Map<string, NodeView>()

  let idx = nodeViews.length
  while(idx--) {
    const nv = nodeViews[idx]
    nodeViewMap.set(nv.id, nv)
  }

  return nodeViewMap
}

const createViewMap = <T extends ViewModel>(views: T[]):Map<string, T> => {
  const viewMap = new Map<string, T>()

  let idx = views.length
  while(idx--) {
    const v = views[idx]
    viewMap.set(v.id, v)
  }

  return viewMap
}


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
  const c: [number, number, number, number?] = [color.r, color.g, color.b, 100]
  return c
}


const createNodeViews = (nodeData: CyNode[]) => {
  let nodeCount: number = nodeData.length

  const nodeViewMap: Map<string, NodeView> = new Map()

  while (nodeCount--) {
    const node = nodeData[nodeCount]

    const {position, data} = node
    const {id, name} = data

    const nv: NodeView = {
      id,
      label: name,
      position: [position.x, position.y],
      color: [200, 200, 200, 160],
      size: 5
    }

    nodeViewMap.set(id, nv)
  }

  return nodeViewMap
}

const createEdgeViews = (edges: CyEdge[]) => {
  // let edgeCount: number = edges.length
  const edgeViewMap: Map<string, EdgeView> = new Map()

  // let min = Number.POSITIVE_INFINITY
  // let max = Number.NEGATIVE_INFINITY

  // while (edgeCount--) {
  //   const edge: CyEdge = edges[edgeCount]
  //   const score = edge.data.combined_score
  //   if(score == undefined) {
  //     continue
  //   }

  //   if (score < min) {
  //     min = score
  //   }

  //   if (score > max) {
  //     max = score
  //   }
  // }

  // console.log('MINMAX = ', min, max)
  // const mapper = d3scale.scaleSequential(d3scaleChromatic.interpolateViridis).domain([min, max])
  // edgeCount = edges.length

  // while (edgeCount--) {
  //   const edge = edges[edgeCount]

  //   const {data} = edge
  //   const {id, s, t, color} = data

  //   const ev: EdgeView = {
  //     color: color,
  //     width: 6,
  //     s,
  //     t
  //   }

  //   edgeViewMap.set(id, ev)
  // }

  return edgeViewMap
}

export {createNodeViews, createEdgeViews}
export default GraphViewFactory

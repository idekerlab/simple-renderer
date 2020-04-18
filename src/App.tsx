import React, {useState, useEffect} from 'react'
import './App.css'
import GraphRenderer from './components/GraphRenderer'
import {createNodeViews, createEdgeViews} from './model/GraphViewFactory'
// import * as sampleGraph from './sample-data/small.json'
import ControlPanel from './components/ControlPanel'
import NodeView from './model/NodeView'
import GraphLayer from './Layers/GraphLayer'
import GraphView from './model/GraphView'
import EdgeView from './model/EdgeView'
import CyNode from './model/CyNode'
import CyEdge from './model/CyEdge'

import * as cxVizConverter from 'cxVizConverter'

import GraphViewFactory from './model/GraphViewFactory'

const BASE_URL = 'http://localhost:3000/v3/network/'
const PRESETS = {
  SMALL: 'e065fc7d-7823-11ea-8057-525400c25d22',
  MEDIUM: 'f500ed57-77c6-11ea-8057-525400c25d22',
  LARGE: 'f00fa512-7dd3-11ea-8503-525400c25d22'
}

const dataUrl = BASE_URL + PRESETS.MEDIUM

type Elements = {
  nodes: CyNode[]
  edges: CyEdge[]
}
type Cyjs = {
  data: object
  elements: Elements
}

const DEF_NODEVIEW: NodeView = {
  id: 'default',
  position: [0, 0, 0]
}

// const initializeData = (cyjs: Cyjs) => {
//   const t0 = performance.now()

//   const cyjsElements = cyjs.elements
//   // const cyjsElements = sampleGraph.default.elements

//   const nodes: CyNode[] = cyjsElements.nodes
//   const edges: CyEdge[] = cyjsElements.edges

//   // Convert to view models
//   const nodeViews = createNodeViews(nodes)
//   const edgeViews = createEdgeViews(edges)

//   console.log('* Data created', performance.now() - t0)
//   return {nodeViews, edgeViews}
// }

const emptyNodes = new Map<string, NodeView>()
const emptyEdges = new Map<string, EdgeView>()

const DEF_GRAPH_VIEW: GraphView = {
  nodeViews: emptyNodes,
  edgeViews: emptyEdges
}

const App: React.FC = () => {
  const [render3d, setRender3d] = useState(false)
  const [data, setData] = useState<GraphView | null>(null)
  const [error, setError] = useState({})
  const [selectedNode, setSelectedNode] = useState(DEF_NODEVIEW)

  async function fetchData() {
    const t0 = performance.now()
    const response = await fetch(dataUrl)
    response
      .json()
      .then((cx) => {
        const result = cxVizConverter.convert(cx, 'lnv')
        console.log('VC result', result)

        const gv = GraphViewFactory.createGraphView(result.nodeViews, result.edgeViews)
        console.log('GV:::', gv)
        console.log('Time:: --------------', performance.now() - t0)
        setData(gv)
      })
      .catch((err) => {
        console.log('* Data fetch error:', err)
        setError(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return !data ? (
    <div className="App">
      Loading Graph......
    </div>
  ) : (
    <div className="App">
      <ControlPanel selectedNode={selectedNode} setRender3d={setRender3d} />
      <GraphRenderer graphView={data} setSelectedNode={setSelectedNode} render3d={render3d} />
    </div>
  )
}

export default App

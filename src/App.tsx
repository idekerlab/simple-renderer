import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import GraphRenderer from './components/GraphRenderer'
import ControlPanel from './components/ControlPanel'
import NodeView from './model/NodeView'
import GraphView from './model/GraphView'
import EdgeView from './model/EdgeView'

import * as cxVizConverter from 'cxVizConverter'
import GraphViewFactory from './model/GraphViewFactory'

// For deployment
const BASE_URL = 'http://dev.ndexbio.org/v3/network/'

const emptyNodes = new Map<string, NodeView>()
const emptyEdges = new Map<string, EdgeView>()

const DEF_SUID = 'e065fc7d-7823-11ea-8057-525400c25d22'

const App: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(DEF_SUID)
  const [render3d, setRender3d] = useState(false)
  const [data, setData] = useState<GraphView | null>(null)
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedNode, setSelectedNode] = useState()
  const [selectedEdge, setSelectedEdge] = useState()

  console.log('* New UUID:', selectedNetwork)

  const dataUrl = BASE_URL + selectedNetwork

  async function fetchData() {
    const t0 = performance.now()
    setLoading(true)
    const response = await fetch(dataUrl)
    response
      .json()
      .then((cx) => {
        const result = cxVizConverter.convert(cx, 'lnv')
        const gv = GraphViewFactory.createGraphView(result.nodeViews, result.edgeViews)
        setData(gv)
        setLoading(false)
      })
      .catch((err) => {
        console.log('* Data fetch error:', err)
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [selectedNetwork])

  return (
    <div className="App">
      <ControlPanel
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        setRender3d={setRender3d}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
      />
      {loading ? (
        <div className="Loading">Loading Graph......</div>
      ) : (
        <GraphRenderer
          graphView={data}
          setSelectedNode={setSelectedNode}
          setSelectedEdge={setSelectedEdge}
          render3d={render3d}
        />
      )}
    </div>
  )
}

export default App

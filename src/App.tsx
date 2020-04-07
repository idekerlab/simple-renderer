import React, {useState, useEffect} from 'react'
import './App.css'
import GraphRenderer from './components/GraphRenderer'
import {createNodeViews, createEdgeViews} from './model/GraphViewFactory'
import * as sampleGraph from './sample-data/pc.json'
import ControlPanel from './components/ControlPanel'

const initializeData = () => {
  const t0 = performance.now()
  const cyjsElements = sampleGraph.default.elements

  const nodes = cyjsElements.nodes
  const edges = cyjsElements.edges

  // Convert to view models
  const nodeViews = createNodeViews(nodes)
  const edgeViews = createEdgeViews(edges)

  console.log('# Data loaded ================', performance.now() - t0)
  return {nodeViews, edgeViews}
}

type AppState = {


}


const App: React.FC = () => {
  const emptyMap = new Map()
  const [data, setData] = useState({nodeViews: emptyMap, edgeViews: emptyMap})
  const [selectedNode, setSelectedNode] = useState({})

  useEffect(() => {
    const data = initializeData()
    setData(data)
  }, [])

  return (
    <div className="App">
      <ControlPanel selectedNode={selectedNode} />
      <GraphRenderer
        data={data}
        setSelectedNode={setSelectedNode}
      />
    </div>
  )
}

export default App

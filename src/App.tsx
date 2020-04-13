import React, {useState, useEffect} from 'react'
import './App.css'
import GraphRenderer from './components/GraphRenderer'
import {createNodeViews, createEdgeViews} from './model/GraphViewFactory'
import * as sampleGraph from './sample-data/string1.json'
import ControlPanel from './components/ControlPanel'

const dataUrl = 'http://chianti.ucsd.edu/~kono/webapp/large-networks/pc.json'

const initializeData = () => {
  const t0 = performance.now()
  const cyjsElements = sampleGraph.default.elements

  const nodes = cyjsElements.nodes
  const edges = cyjsElements.edges

  // Convert to view models
  const nodeViews = createNodeViews(nodes)
  const edgeViews = createEdgeViews(edges)

  console.log('* Data created', performance.now() - t0)
  return {nodeViews, edgeViews}
}

const App: React.FC = () => {
  const emptyMap = new Map()
  const [data, setData] = useState({nodeViews: emptyMap, edgeViews: emptyMap})
  const [error, setError] = useState({})
  const [selectedNode, setSelectedNode] = useState({})
  
  // async function fetchData() {
  //   const response = await fetch(dataUrl)
  //   response
  //     .json()
  //     .then((cyjs) => {
  //       const data = initializeData(cyjs.elements)
  //       setData(data)
  //     })
  //     .catch((err) => setError(err))
  // }

  useEffect(() => {
    const data = initializeData()
    setData(data)
    console.log('Loaded')
  }, [])

  if (data.nodeViews.size === 0) {
    return <div className="App" />
  }

  return (
    <div className="App">
      <ControlPanel selectedNode={selectedNode} />
      <GraphRenderer data={data} setSelectedNode={setSelectedNode} />
    </div>
  )
}

export default App

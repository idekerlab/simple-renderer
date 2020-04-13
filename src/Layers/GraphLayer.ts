import {CompositeLayer} from '@deck.gl/core'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'

import {createNodeLayer} from './NodeLayer'

const HIGHLIGHT_COLOR = [255, 0, 0, 255]

const _handleSelectNode = (selection) => {
  console.log('**Update node selection:', selection)
}

class GraphLayer extends CompositeLayer {
  initializeState(context) {
    console.log('GL init::', context)
  }

  updateState({props, changeFlags}) {
    console.log('--------------------->> State UP', props)
  }

  getPickingInfo(pickingInfo) {
    const {setSelectedNode} = this.props

    const {mode, info} = pickingInfo
    if (mode === 'query') {
      console.log('Selection::', pickingInfo)
      setSelectedNode(info.object)
    }
  }

  renderLayers() {
    const {data, showEdges} = this.props
    const {nodeViews, edgeViews} = data

    const t0 = performance.now()

    const nodeLayer = createNodeLayer(nodeViews)
    const eLayers = getLayers(edgeViews)

    const edgeLayer = new LineLayer({
      id: `edge-layer`,
      data: eLayers[0],
      getSourcePosition: (e) => {
        const source = nodeViews.get(e.source)
        return [source.position.x, source.position.y]
      },
      getTargetPosition: (e) => {
        const target = nodeViews.get(e.target)
        return [target.position.x, target.position.y]
      },
      getColor: (e) => e.color,
      strokeWidth: 1,
      visible: showEdges,
      pickable: true,
      widthScale: 2,
      autoHighlight: true,
      highlightColor: [255, 0, 0]
    })

    // const edgeLayerSub = new LineLayer({
    //   id: `link-layer2`,
    //   data: eLayers[1],
    //   pickable: false,
    //   getSourcePosition: (e) => {
    //     const source = nodeViews.get(e.source)
    //     return [source.position.x, source.position.y]
    //   },
    //   getTargetPosition: (e) => {
    //     const target = nodeViews.get(e.target)
    //     return [target.position.x, target.position.y]
    //   },
    //   getColor: [255, 80, 80, 100],
    //   strokeWidth: 1,
    //   visible: isSubEdgesVisible && !hide
    // })

    console.log('Graph Layer created.  E count = ', edgeViews.size, performance.now() - t0)
    return [edgeLayer, nodeLayer]
  }
}

const getLayers = (edgeViews) => {
  const edgeCount = edgeViews.size
  const evs = [...edgeViews.values()]

  let idx = 0

  const layer1 = []
  const layer2 = []

  while (idx < edgeCount) {
    const ev = evs[idx]
    if (idx % 2 === 0) {
      layer1.push(ev)
    } else {
      layer2.push(ev)
    }
    idx++
  }
  return [layer1, layer2]
}

GraphLayer.layerName = 'GraphLayer'
export default GraphLayer

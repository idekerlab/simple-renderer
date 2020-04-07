import {CompositeLayer} from '@deck.gl/core'

import NodeLayer from './NodeLayer' 

class GraphLayer extends CompositeLayer {

  renderLayers() {

    console.log('GL data ', this.props)
    const nodesLayer = new NodeLayer(this.props.data)

    return [nodesLayer]
  }
}

GraphLayer.layerName = 'GraphLayer'

export default GraphLayer

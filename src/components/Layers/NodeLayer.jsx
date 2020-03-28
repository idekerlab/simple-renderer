import {ScatterplotLayer} from '@deck.gl/layers'

const NodeLayer = nodes => {
  
  return new ScatterplotLayer({
    data: nodes,
    getPosition: d => d,
    getColor: '#FF0000',
    getRadius: 1,
    opacity: 1
  })
}

export default NodeLayer

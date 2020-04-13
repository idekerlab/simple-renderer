import {ScatterplotLayer} from '@deck.gl/layers'
import NodeView from '../model/NodeView'


const createNodeLayer = (nodeViewMap: Map<string, NodeView>) => {
  const nodeViews: Iterable<NodeView> = nodeViewMap.values()

  return new ScatterplotLayer({
    data: [...nodeViews],
    getPosition: (d) => [d.position.x, d.position.y],
    getColor: (d) => d.color,
    getRadius: (d) => d.size,
    pickable: true,
    autoHighlight: true,
    highlightColor: [255, 0, 0]
  })
}

export {createNodeLayer}

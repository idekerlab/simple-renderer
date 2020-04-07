import NodeView from './NodeView'
import EdgeView from './EdgeView'

type GraphView = {
    backgroundColor: string,
    nodes: ReadonlyArray<NodeView>,
    edges: ReadonlyArray<EdgeView>
}

export default GraphView
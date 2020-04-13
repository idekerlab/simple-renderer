import Position from './Position'

type NodeView = {
    id: string,
    label?: string,
    position: Position,
    color: [number, number, number],
    size: number
}

export default NodeView
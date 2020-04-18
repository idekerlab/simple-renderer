type CyEdge = {
    data: {
        id: string,
        source: string,
        target: string,
        combined_score?: number
    }
}

export default CyEdge
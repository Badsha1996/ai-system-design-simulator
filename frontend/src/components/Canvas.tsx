import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { JSX, useCallback, useState } from "react";
import { EdgeType, initialEdges } from "~/utils/edges";
import { initialNodes, NodeType } from "~/utils/nodes";


export function Canvas(): JSX.Element {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeType[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<NodeType>[]): void =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<EdgeType>[]): void =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: {
      id?: string;
      source: string;
      sourceHandle?: string | null;
      target: string;
      targetHandle?: string | null;
    }): void =>
      setEdges((eds) =>
        addEdge(
          {
            // ensure required fields exist on the created edge
            ...params,
            id:
              params.id ?? `e-${params.source}-${params.target}-${Date.now()}`,
            // EdgeType requires a label — provide a default
            label: "",
          } as EdgeType,
          eds,
        ),
      ),
    [],
  );

  return (
    <div className="w-[calc(100vw - 5rem)] h-[calc(100vh-5rem)] rounded-lg shadow-lg">
      <ReactFlow
        colorMode="dark"
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

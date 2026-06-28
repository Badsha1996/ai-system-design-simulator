export interface NodeType {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type: "input" | "output";
}

export const initialNodes : NodeType[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "input",
  },
  {
    id: "n2",
    position: { x: 100, y: 100 },
    data: { label: "Node 2" },
    type: "output",
  },
];

export interface EdgeType {
  id: string;
  source: string;
  target: string;

  type: string;
  label: string;
}

export const initialEdges: EdgeType[] = [];

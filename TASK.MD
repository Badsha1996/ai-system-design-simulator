# Jira Tickets — System Design Simulator
> All tickets are ordered by sprint. Each ticket includes: context, acceptance criteria, technical notes, and definition of done.

---

## EPIC 1: Canvas Core
> Sprint 1 | Dev 1 + Dev 2

---

### SDS-001 · Set up React Flow canvas with drag-and-drop

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 1
**Priority:** Critical
**Story Points:** 5

**Background:**
This is the foundation of the entire product. Every other feature builds on top of this canvas. We're using React Flow because it gives us nodes, edges, zoom/pan, and selection out of the box. The goal is a blank but functional canvas that a user can interact with.

**What needs to be built:**
- Initialize a React Flow canvas that fills the full browser viewport (minus a top nav bar, if any)
- Enable pan (click + drag on empty space) and zoom (scroll wheel)
- Canvas should have a subtle dot-grid or line-grid background — this signals to the user it's an infinite workspace
- Nodes dragged onto canvas should snap to a loose grid (e.g., 20px increments) to keep layouts clean
- Mini-map in the bottom-right corner showing a bird's-eye view of the canvas
- Fit-to-screen button that centers and zooms to fit all nodes

**Acceptance Criteria:**
- [ ] Canvas renders on page load with no errors
- [ ] User can pan by clicking and dragging on empty canvas space
- [ ] User can zoom in/out with scroll wheel; zoom limits set to 0.25x min and 2x max
- [ ] Grid background is visible and scales correctly with zoom level
- [ ] Mini-map renders in bottom-right and reflects canvas state
- [ ] "Fit to screen" button centers all placed nodes in view
- [ ] No performance lag on initial load (< 300ms to interactive)

**Out of scope:** No components, no sidebar, no connections yet.

---

### SDS-002 · Build component palette sidebar

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 1
**Priority:** Critical
**Story Points:** 3

**Background:**
Users need a way to discover and place components onto the canvas. This is a left-side panel containing all the available architecture building blocks. Think of it like a shapes panel in Figma or Lucidchart.

**Components to include (with icons):**
- Client (browser/mobile icon)
- Load Balancer
- API Gateway
- Service / Microservice
- Cache (Redis icon style)
- Database (cylinder icon)
- Kafka / Message Queue
- CDN
- Object Storage (S3-style)

**What needs to be built:**
- Fixed left sidebar, ~240px wide, always visible
- Each component shown as a small card: icon + label
- Components are draggable from the sidebar onto the canvas (React Flow supports this via `onDragOver` and `onDrop`)
- When a component is dragged and dropped on the canvas, it creates a new node at the drop position
- Sidebar should be scrollable if more items are added later
- Group components into categories: "Networking", "Compute", "Storage", "Messaging"

**Acceptance Criteria:**
- [ ] All 9 component types appear in the sidebar with distinct icons and labels
- [ ] User can drag any component from the sidebar and drop it onto the canvas
- [ ] Dropped component appears at the correct position on the canvas (not offset)
- [ ] Each component type renders with a unique visual style/color on the canvas (not all grey boxes)
- [ ] Sidebar categories are collapsible
- [ ] Dropping the same component multiple times creates multiple independent nodes

---

### SDS-003 · Connect nodes with directional edges

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 1
**Priority:** Critical
**Story Points:** 3

**Background:**
An architecture diagram without connections is meaningless. Users need to draw arrows between components to define how data flows. React Flow handles this natively — we need to configure it correctly and make it feel intuitive.

**What needs to be built:**
- Hovering over a node should show connection handles (small dots) on the edges of the node
- User can click and drag from one handle to another node to create a directional edge (arrow)
- Arrows should have an arrowhead on the target end to show direction of data flow
- Edges should be curved (bezier) by default, not straight lines
- Clicking an existing edge should highlight it and show a delete option
- Multiple edges between different nodes should be allowed
- Self-connections (a node connecting to itself) should be prevented

**Acceptance Criteria:**
- [ ] Connection handles appear on node hover
- [ ] Dragging from one node's handle to another creates an arrow
- [ ] Arrow has a visible arrowhead pointing toward the target node
- [ ] Edges render as smooth curves, not jagged lines
- [ ] Clicking an edge highlights it in a distinct color
- [ ] A "delete" button or pressing Backspace removes a selected edge
- [ ] Connecting a node to itself is blocked (no self-loop edges)
- [ ] At least 2 edges can exist between different node pairs without visual collision

---

### SDS-004 · Node selection and highlight behavior

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 1
**Priority:** Medium
**Story Points:** 2

**Background:**
When a user clicks on a node, the UI needs to clearly communicate what's selected so follow-up actions (like opening a config panel, or deleting) are unambiguous. This also lays the groundwork for the config panel in Week 2.

**What needs to be built:**
- Clicking a node selects it — shows a visible selection ring/border around it
- Clicking empty canvas space deselects all nodes
- Selected node should have a subtle shadow or highlight to pop visually
- Multiple selection via Shift+click (select multiple nodes at once)
- Box selection: click and drag on empty space to select all nodes within the drag rectangle
- Pressing Delete or Backspace when a node is selected removes it from the canvas
- Selected node's name/type shown in a status bar at the bottom of the screen

**Acceptance Criteria:**
- [ ] Single click selects a node and shows a clear visual selection state
- [ ] Clicking canvas background deselects everything
- [ ] Shift+click adds a node to the current selection
- [ ] Drag-to-select (box selection) selects all nodes within the box
- [ ] Delete/Backspace removes selected node(s) and any edges connected to them
- [ ] Status bar at bottom shows: "Selected: [Component Type] — [Node Label]"
- [ ] No node appears selected on initial canvas load

---

## EPIC 2: Component Configuration
> Sprint 2 | Dev 1 + Dev 3

---

### SDS-005 · Configuration panel — click node to open side panel

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 2
**Priority:** Critical
**Story Points:** 3

**Background:**
Each component on the canvas has configuration options (e.g., a database has read replicas, a service has instance count). Clicking a node should open a right-side panel where the user can set these parameters. This panel is the primary configuration interface for the entire app.

**What needs to be built:**
- Clicking a node opens a right-side config panel (~320px wide)
- Panel slides in from the right with a smooth animation
- Panel header shows the component name (editable inline) and component type
- Panel closes when user clicks the X button or presses Escape
- Panel closes if user clicks a different node (and reopens for the new node)
- Canvas shifts left slightly when panel opens so the selected node isn't hidden behind it (optional but nice)
- Each component type has a different set of config fields (see SDS-006 through SDS-009 for specifics)

**Acceptance Criteria:**
- [ ] Clicking any node opens the config panel for that node
- [ ] Panel animates open (slide-in from right, ~200ms)
- [ ] Component label at top of panel is editable (click to rename)
- [ ] Panel shows the correct fields for the component type clicked
- [ ] Pressing Escape or clicking X closes the panel
- [ ] Clicking a different node while panel is open switches to that node's config without closing
- [ ] Panel does not overlap or obscure the selected node

---

### SDS-006 · Config fields — Kafka / Message Queue

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 2
**Priority:** High
**Story Points:** 2

**Background:**
When a user places a Kafka node and opens its config panel, they need to be able to configure the parameters that affect system performance and failure analysis. These values will be consumed by the AI analysis and simulation engine later.

**Fields to implement:**

| Field | Type | Default | Range/Options |
|---|---|---|---|
| Number of Partitions | Number input | 3 | 1–1000 |
| Replication Factor | Number input | 3 | 1–5 |
| Retention Period | Dropdown | 7 days | 1h / 6h / 1d / 3d / 7d / 30d |
| Message Size (avg) | Number input (KB) | 1 | 1–10,000 |
| Consumer Groups | Number input | 1 | 1–50 |
| Throughput (msg/sec) | Number input | 1000 | 1–1,000,000 |

**Acceptance Criteria:**
- [ ] All 6 fields render correctly in the config panel when a Kafka node is selected
- [ ] Number inputs enforce their min/max ranges (invalid input shown with red border)
- [ ] Dropdown renders with all listed options
- [ ] Values are saved to the node's data model immediately on change (no "Save" button needed)
- [ ] Re-opening the panel for the same node shows the previously entered values
- [ ] Default values are pre-populated on node creation

---

### SDS-007 · Config fields — Database

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 2
**Priority:** High
**Story Points:** 2

**Fields to implement:**

| Field | Type | Default | Options |
|---|---|---|---|
| Database Type | Dropdown | PostgreSQL | PostgreSQL / MySQL / MongoDB / Cassandra / DynamoDB |
| Read Replicas | Number input | 0 | 0–10 |
| Indexing | Toggle | On | On / Off |
| Connection Pool Size | Number input | 20 | 1–500 |
| Storage Size | Dropdown | 100 GB | 20GB / 100GB / 500GB / 1TB / 5TB |
| Multi-AZ | Toggle | Off | On / Off |

**Acceptance Criteria:**
- [ ] All 6 fields render correctly for Database nodes
- [ ] Dropdown shows all 5 DB type options
- [ ] Toggles (Indexing, Multi-AZ) render as proper toggle switches, not checkboxes
- [ ] Values persist on panel close/reopen for the same node
- [ ] Connection Pool Size enforces the 1–500 range

---

### SDS-008 · Config fields — Service / Microservice

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 2
**Priority:** High
**Story Points:** 2

**Fields to implement:**

| Field | Type | Default | Options/Range |
|---|---|---|---|
| Instance Count | Number input | 2 | 1–100 |
| RPS Limit (per instance) | Number input | 500 | 1–100,000 |
| Memory per Instance | Dropdown | 2 GB | 512MB / 1GB / 2GB / 4GB / 8GB / 16GB |
| CPU per Instance | Dropdown | 1 vCPU | 0.25 / 0.5 / 1 / 2 / 4 / 8 vCPU |
| Auto-scaling | Toggle | Off | On / Off |
| Max Instances (if auto-scale on) | Number input | 10 | 2–500 |

**Acceptance Criteria:**
- [ ] All 6 fields render correctly for Service nodes
- [ ] "Max Instances" field is disabled/greyed out when Auto-scaling is toggled Off
- [ ] "Max Instances" becomes enabled when Auto-scaling is toggled On
- [ ] Values persist on reopen
- [ ] RPS Limit enforces 1–100,000 range

---

### SDS-009 · Config fields — Cache and Load Panel

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 2
**Priority:** High
**Story Points:** 3

**Cache config fields:**

| Field | Type | Default | Options/Range |
|---|---|---|---|
| Cache Type | Dropdown | Redis | Redis / Memcached |
| TTL | Number + unit dropdown | 5 min | seconds / minutes / hours / days |
| Eviction Policy | Dropdown | LRU | LRU / LFU / FIFO / No eviction |
| Max Memory | Dropdown | 1 GB | 256MB / 512MB / 1GB / 4GB / 16GB |
| Cluster Mode | Toggle | Off | On / Off |

**Load Panel (global, not per-node — lives in the top bar or a fixed panel):**
This is a global settings panel for the entire canvas simulation, not for a specific node.

| Field | Type | Default | Options/Range |
|---|---|---|---|
| Requests per Second (RPS) | Number input | 1000 | 1–10,000,000 |
| Average Payload Size | Dropdown | 10 KB | 1KB / 10KB / 100KB / 1MB |
| Peak Traffic Multiplier | Slider | 1x | 1x–20x |
| Geographic Distribution | Dropdown | Single Region | Single / Multi-region / Global |

**Acceptance Criteria:**
- [ ] Cache config fields render and persist correctly for Cache nodes
- [ ] Load panel is accessible from a persistent "Load Settings" button in the top navigation bar
- [ ] Load panel opens as a modal or drawer — not tied to a specific node
- [ ] RPS slider or input accepts values up to 10,000,000
- [ ] Peak Traffic Multiplier is a draggable slider with a live value label
- [ ] Load settings persist globally (not reset when user clicks a node)

---

## EPIC 3: AI Failure Analysis
> Sprint 3 | Dev 2 + Dev 1

---

### SDS-010 · Serialize canvas state to JSON for AI

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 3
**Priority:** Critical
**Story Points:** 3

**Background:**
Before we can call the AI, we need to convert the visual canvas state into a structured JSON object that represents the architecture. This JSON becomes the "context" for Claude. Getting this right is critical — garbage in, garbage out.

**What the JSON should include:**
```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "database",
      "label": "Primary DB",
      "config": {
        "db_type": "PostgreSQL",
        "read_replicas": 2,
        "multi_az": true,
        ...
      },
      "position": { "x": 400, "y": 300 }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "label": ""
    }
  ],
  "load": {
    "rps": 50000,
    "payload_size_kb": 10,
    "peak_multiplier": 3
  }
}
```

**Acceptance Criteria:**
- [ ] A utility function `serializeCanvas()` exists that takes React Flow state and returns the above JSON structure
- [ ] All node types serialize their full config (no undefined fields)
- [ ] Edge direction is preserved (source → target, not reversed)
- [ ] Load settings are included in the serialized output
- [ ] Calling the function twice on an unchanged canvas produces identical output
- [ ] Unit test: given a 3-node, 2-edge canvas, verify the JSON structure is correct
- [ ] Handles edge case: empty canvas returns `{ nodes: [], edges: [], load: {...} }`

---

### SDS-011 · Backend API endpoint for AI analysis

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 3
**Priority:** Critical
**Story Points:** 5

**Background:**
The frontend will POST the canvas JSON to our backend, which calls the Claude API and returns structured analysis results. We don't want to call Claude directly from the frontend because we'd expose the API key. The backend also lets us add caching, rate limiting, and logging later.

**What needs to be built:**

Endpoint: `POST /api/analyze`

Request body: the canvas JSON from SDS-010

Response body:
```json
{
  "analysis_id": "uuid",
  "node_annotations": [
    {
      "node_id": "node-1",
      "severity": "critical",
      "issue": "Single point of failure — no read replicas and no Multi-AZ",
      "suggestion": "Enable Multi-AZ and add at least 2 read replicas"
    }
  ],
  "suggestions": [
    {
      "rank": 1,
      "severity": "critical",
      "title": "Database is a SPOF",
      "description": "Your PostgreSQL instance has no read replicas and no Multi-AZ. If this goes down, your entire system fails.",
      "affected_node_id": "node-1",
      "fix": "Enable Multi-AZ replication and add 2 read replicas"
    }
  ],
  "summary": "3 critical issues, 2 warnings, 1 optimization opportunity found."
}
```

**Prompt engineering notes:**
- System prompt should tell Claude it's a senior staff engineer analyzing system designs
- Include the full canvas JSON in the user message
- Ask Claude to respond ONLY in JSON (no markdown, no preamble)
- Instruct Claude to identify: single points of failure, missing redundancy, scaling bottlenecks, missing caching layers, and misconfigurations
- Set severity levels: `critical` = will fail under load or single failure, `warning` = degrades under stress, `optimization` = can be improved but not urgent

**Acceptance Criteria:**
- [ ] `POST /api/analyze` accepts canvas JSON and returns the structured response above
- [ ] Claude API key is stored server-side only (never exposed to frontend)
- [ ] Endpoint returns HTTP 200 with valid JSON on success
- [ ] Endpoint returns HTTP 400 with error message if canvas JSON is malformed
- [ ] Endpoint returns HTTP 500 with generic error if Claude API fails (no raw error leakage)
- [ ] Response time logged — alert if > 15 seconds (Claude can be slow)
- [ ] Integration test: POST a known canvas JSON, assert response has at least 1 node_annotation

---

### SDS-012 · Display AI analysis results on canvas

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 3
**Priority:** Critical
**Story Points:** 4

**Background:**
After the AI returns analysis, we need to visually overlay the results onto the canvas. Each node that has an issue should show a color-coded badge. This is the "wow" moment — the user sees their architecture light up with problems.

**What needs to be built:**
- Color-coded severity badges overlaid on nodes:
  - 🔴 Red circle with `!` icon → Critical
  - 🟡 Yellow circle with `!` icon → Warning
  - 🟢 Green circle with `✓` icon → OK / no issues
- Hovering over a badge shows a tooltip with the issue description
- Nodes with no annotation default to a green badge after analysis runs
- "Analyze System" button in the top bar triggers the analysis flow
- While analysis is running: button shows a spinner + "Analyzing..." text, canvas is non-interactive
- After analysis: badges render on all annotated nodes

**Acceptance Criteria:**
- [ ] "Analyze System" button exists in the top navigation bar
- [ ] Clicking the button triggers `POST /api/analyze` with the current canvas state
- [ ] While waiting for response: button is disabled and shows loading state
- [ ] On success: red/yellow/green badges appear on respective nodes
- [ ] Hovering a badge shows a tooltip with: severity label + issue text (from `node_annotations`)
- [ ] Nodes with no issues get a green badge
- [ ] On API error: a toast notification appears ("Analysis failed — please try again")
- [ ] Running analysis again replaces previous badges (no duplicates)

---

### SDS-013 · AI suggestions panel

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 3 / Week 4
**Priority:** High
**Story Points:** 3

**Background:**
Beyond the canvas badges, we need a side panel that lists all suggestions in priority order. This is the "action list" the user works through. Each suggestion should be clickable and link back to the affected node.

**What needs to be built:**
- Right-side panel (or bottom drawer) that opens after analysis completes
- Suggestions listed in order: Critical first, then Warning, then Optimization
- Each suggestion card shows:
  - Severity pill (colored label)
  - Title (bold)
  - Description (1–2 sentences)
  - "Jump to node" link — clicking this centers and selects the affected node on canvas
- Panel has a header: "Analysis Results — [N] issues found"
- Panel can be closed and reopened via a button in the top bar

**Acceptance Criteria:**
- [ ] Suggestions panel opens automatically after analysis completes
- [ ] Suggestions are sorted: Critical → Warning → Optimization
- [ ] Each card shows severity pill, title, and description
- [ ] Clicking "Jump to node" centers the canvas on the affected node and selects it
- [ ] Panel shows total count: e.g., "3 Critical · 2 Warnings · 1 Optimization"
- [ ] Panel can be toggled open/closed without re-running analysis
- [ ] Empty state: if no issues found, panel shows "No issues detected. Great architecture!"

---

## EPIC 4: Suggestion Engine
> Sprint 4 | Dev 2 + Dev 3

---

### SDS-014 · "Apply Suggestion" — auto-update node config

**Type:** Story
**Assignee:** Dev 2 + Dev 3
**Sprint:** Week 4
**Priority:** High
**Story Points:** 5

**Background:**
The most powerful UX feature of Month 1 — the user can click "Apply Fix" on a suggestion and the system automatically updates the relevant node's configuration. No manual editing needed.

**What needs to be built:**
- Each suggestion card has an "Apply Fix" button
- Clicking it calls a second AI endpoint: `POST /api/apply-suggestion`
  - Request: `{ suggestion_id, node_id, current_config, suggestion_text }`
  - Response: `{ updated_config: { ...new values } }`
- The frontend merges the returned config into the node's data model
- The node on canvas visually updates (e.g., badge changes from red → yellow or green)
- A success toast appears: "Fix applied — Multi-AZ enabled on Primary DB"
- The suggestion card in the panel is marked as "Applied" with a checkmark

**Acceptance Criteria:**
- [ ] "Apply Fix" button exists on each suggestion card
- [ ] Clicking it sends the correct request to the backend
- [ ] The node's config panel reflects the updated values after applying
- [ ] The canvas badge updates to reflect the new (hopefully lower) severity
- [ ] The suggestion card shows an "Applied ✓" state after fix is applied
- [ ] If the fix cannot be auto-applied (ambiguous suggestion), show: "This fix requires manual configuration"
- [ ] Applied fixes are tracked in session state (not lost on panel close/reopen)

---

### SDS-015 · Re-analyze after applying suggestion (diff view)

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 4
**Priority:** Medium
**Story Points:** 3

**Background:**
After applying a suggestion, the user should be able to re-run analysis and see what changed. A diff view makes the improvement tangible — it shows "before" vs "after" in terms of issues found.

**What needs to be built:**
- "Re-analyze" button appears after at least one fix has been applied
- Running re-analysis compares new results against the previous run
- Diff display on the suggestions panel:
  - Resolved issues marked with a green strikethrough and "✓ Fixed" label
  - New issues (if any) marked with a "New" red badge
  - Unchanged issues remain the same
- A summary line at the top: "3 issues resolved, 0 new issues, 2 remaining"

**Acceptance Criteria:**
- [ ] "Re-analyze" button appears in the suggestions panel header after any fix is applied
- [ ] Re-analysis calls the same `POST /api/analyze` endpoint with updated canvas state
- [ ] Issues that were in the previous run but not in the new run show "✓ Fixed" state
- [ ] Issues that are new in the current run but weren't before show "New" badge
- [ ] Summary line shows resolved / new / remaining counts
- [ ] Diff state clears if user manually edits the canvas after applying fixes

---

## EPIC 5: Cost Estimation Engine
> Sprint 5 | Dev 3 + Dev 2

---

### SDS-016 · Per-component cost model

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 5
**Priority:** Critical
**Story Points:** 8

**Background:**
This is described in the roadmap as "the most exclusive feature." We build a static cost model based on AWS pricing. This is not a live API call to AWS — it's a hardcoded pricing model we maintain internally, based on publicly available AWS pricing. We can update it quarterly.

**Cost models to implement:**

| Component | Pricing Basis | Reference |
|---|---|---|
| Service / Microservice | EC2 t3/m5 equivalent × instance count | AWS EC2 On-Demand |
| Database | RDS instance class + storage | AWS RDS |
| Cache | ElastiCache node type × node count | AWS ElastiCache |
| Kafka | MSK broker type × broker count | AWS MSK |
| Load Balancer | ALB fixed cost + LCU cost | AWS ALB |
| CDN | CloudFront per-GB transfer | AWS CloudFront |
| Object Storage | S3 per-GB storage + request cost | AWS S3 |
| API Gateway | Per-million API calls | AWS API Gateway |

Build a `CostCalculator` module that:
- Takes a node's type and config as input
- Returns `{ monthly_cost_usd: number, cost_breakdown: { compute, storage, transfer, ... } }`

**Acceptance Criteria:**
- [ ] `CostCalculator.calculate(nodeType, config)` returns a cost object for each component type
- [ ] All 8 component types have a cost model implemented
- [ ] Cost scales correctly with config: more instances = higher cost, more storage = higher cost
- [ ] Unit tests: verify 3 nodes produce expected cost output with known inputs
- [ ] A "pricing updated" timestamp is stored in the cost model (e.g., "Pricing as of Q1 2025")
- [ ] Cost model handles edge cases: 0 replicas, 0 instances — returns $0 for that dimension rather than crashing

---

### SDS-017 · Monthly cost breakdown panel

**Type:** Story
**Assignee:** Dev 3 + Dev 1
**Sprint:** Week 5
**Priority:** Critical
**Story Points:** 4

**Background:**
The cost breakdown panel is the user-facing view of the cost engine. It gives engineers a real sense of what their architecture costs to run.

**What needs to be built:**
- Cost panel accessible via a "$" button or "Cost" tab in the top navigation
- Opens as a right-side panel or modal
- Shows:
  - Total monthly cost (large, prominent number at top)
  - Cost per request (total monthly cost ÷ estimated monthly requests)
  - Per-component cost breakdown (bar chart or table — each node and its cost)
  - Cost by category: Compute / Storage / Networking / Messaging
- Components sorted by cost (most expensive at top)
- Each component row in the table links to the node on canvas (click → canvas jumps to node)

**Acceptance Criteria:**
- [ ] Cost panel opens via a clearly labeled button in the top bar
- [ ] Total monthly cost is prominently displayed (large font, $XX,XXX format)
- [ ] Cost per request is shown (e.g., "$0.0004 / request at 50K RPS")
- [ ] Per-component table shows: component name, type, and monthly cost
- [ ] Components are sorted highest cost → lowest
- [ ] Clicking a component row selects that node on canvas
- [ ] Cost updates automatically when a node's config is changed
- [ ] Panel shows "Last updated: just now" timestamp

---

### SDS-018 · "Cost at scale" slider

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 5
**Priority:** High
**Story Points:** 3

**Background:**
The most visually impressive part of the cost panel — a slider that lets you drag from 1K to 10M users and watch the total cost change in real-time. This makes the cost implications of architecture decisions viscerally real.

**What needs to be built:**
- A logarithmic slider at the bottom of the cost panel
- Range: 1,000 users/day → 10,000,000 users/day
- As the slider moves, total cost and per-component costs update in real-time
- Scale factor is derived from: `(slider_value / base_rps) × base_cost`
- Slider has labeled stops: 1K / 10K / 100K / 1M / 10M
- The most expensive component gets a red "💸 Cost driver" label at scale

**Acceptance Criteria:**
- [ ] Slider renders in the cost panel with the correct range
- [ ] Dragging the slider updates total cost without page reload (< 50ms update)
- [ ] Scale is logarithmic (not linear) — slider moves in order-of-magnitude steps
- [ ] At 10M users, cost numbers should realistically be 10–1000x the base cost
- [ ] "Cost driver" label appears on the highest-cost component when slider is above 1M
- [ ] Slider position resets to base load when cost panel is closed and reopened

---

### SDS-019 · AI suggests cheaper alternatives

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 5
**Priority:** Medium
**Story Points:** 3

**Background:**
After calculating cost, the AI should be able to make cost-optimization suggestions. This is a separate AI call from the failure analysis — it's specifically focused on reducing spend.

**What needs to be built:**
- "Optimize Cost" button at the top of the cost panel
- Calls `POST /api/cost-optimize` with canvas JSON + current cost breakdown
- Claude responds with 2–4 cost optimization suggestions in structured JSON:
```json
{
  "suggestions": [
    {
      "title": "Switch to Aurora Serverless",
      "affected_node_id": "node-1",
      "current_cost": 450,
      "projected_cost": 180,
      "savings_percent": 60,
      "tradeoff": "Slightly higher cold-start latency on first query"
    }
  ]
}
```
- Suggestions display in a "Cost Optimizations" section below the breakdown
- Each suggestion shows: title, $ savings/month, % reduction, and trade-off note

**Acceptance Criteria:**
- [ ] "Optimize Cost" button exists in the cost panel
- [ ] Button triggers API call and shows loading state
- [ ] 2–4 optimization suggestions render below the cost breakdown
- [ ] Each suggestion shows: title, current cost, projected cost, savings %, trade-off
- [ ] Suggestions are sorted by highest $ savings first
- [ ] Clicking "Apply" on a cost suggestion updates the relevant node config (reuses SDS-014 flow)

---

## EPIC 6: Failure Simulation Mode
> Sprint 6 | Dev 3 + Dev 1

---

### SDS-020 · "Kill a node" mode

**Type:** Story
**Assignee:** Dev 3 + Dev 1
**Sprint:** Week 6
**Priority:** Critical
**Story Points:** 5

**Background:**
The failure simulation mode lets users understand the blast radius of component failures. This is the most visually impressive feature of the product. Clicking a node to kill it should trigger a cascade animation showing what else goes down.

**What needs to be built:**
- Toggle button in top bar: "☠️ Chaos Mode" — when active, clicking a node kills it instead of selecting it
- Killing a node:
  - Node turns dark/grey with a ☠️ or ✕ icon overlay
  - Edges connecting to/from this node flash red
  - Downstream nodes (nodes that depend on this killed node) turn red
  - Cascade propagation: if A kills B and B is the only path to C, C also turns red
- "Restore" button on the killed node brings it back (and cascades back to green)
- Only one node can be killed at a time in this version (no simultaneous multi-kill)
- Chaos Mode toggle is clearly visually distinct from normal mode (e.g., red border on canvas)

**Acceptance Criteria:**
- [ ] "Chaos Mode" toggle button exists in top navigation
- [ ] When Chaos Mode is active, canvas border changes color to signal the different state
- [ ] Clicking a node in Chaos Mode kills it (not opens config panel)
- [ ] Killed node renders with distinct visual style (greyed out + icon)
- [ ] Edges from the killed node render red
- [ ] Downstream nodes that lose all input paths render red
- [ ] Cascade calculation is correct: if a node has an alternative path, it stays green
- [ ] "Restore" button on the killed node restores it and updates all cascade states
- [ ] Exiting Chaos Mode restores all nodes to their previous state

---

### SDS-021 · Cascade failure animation

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 6
**Priority:** High
**Story Points:** 3

**Background:**
The cascade failure shouldn't just appear instantly — it should visually propagate outward from the killed node in a wave, so the user can follow the failure spreading through their system.

**What needs to be built:**
- When a node is killed, the failure propagates with a time delay:
  - Immediate: the killed node goes dark
  - +300ms: direct downstream nodes flash red
  - +600ms: second-degree downstream nodes flash red
  - And so on per hop
- Each affected edge animates (dashed red line moving in the failure direction)
- The animation is interruptible — if the user restores the node mid-animation, it reverses

**Acceptance Criteria:**
- [ ] Failure propagates with a visible delay per hop (not instant)
- [ ] Edges between failed nodes animate (moving dashes or pulse effect)
- [ ] Second-degree failures appear after first-degree failures (staged)
- [ ] Restoring a node reverses the cascade animation
- [ ] Animation completes within 2 seconds for a 10-node graph
- [ ] Animation does not run if only 1 node is on the canvas

---

### SDS-022 · AI blast radius explanation

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 6
**Priority:** High
**Story Points:** 3

**Background:**
After killing a node, the AI should explain — in plain English — what the impact of this failure is. This turns the visual animation into something educational and interview-ready.

**What needs to be built:**
- When a node is killed, automatically call `POST /api/blast-radius`
  - Request: `{ killed_node_id, canvas_json }`
  - Response: `{ affected_nodes: [...], explanation: "...", sla_impact: "...", recovery_suggestion: "..." }`
- A small panel or tooltip near the killed node shows the explanation
- Panel content:
  - "Killing [component name] affects X downstream services"
  - SLA impact: "Estimated downtime: 23 minutes → violates 99.9% SLA"
  - Recovery suggestion: "Add a replica of this service to eliminate this SPOF"

**Acceptance Criteria:**
- [ ] Killing a node triggers an AI call automatically (with loading indicator)
- [ ] Blast radius panel appears near the killed node or as a fixed bottom banner
- [ ] Panel shows: affected node count, explanation text, SLA impact, and recovery suggestion
- [ ] SLA impact calculation is based on the estimated downtime of the failed component
- [ ] Panel dismisses when the node is restored
- [ ] If the killed node has no downstream dependencies, panel says "No downstream impact detected"

---

### SDS-023 · Predefined chaos scenarios

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 6
**Priority:** Medium
**Story Points:** 4

**Background:**
Beyond killing a single node, users should be able to simulate common real-world failure scenarios with one click. These are pre-scripted chaos events.

**Scenarios to implement:**

| Scenario | What it does |
|---|---|
| Network Partition | All edges between two node groups are severed |
| DB Overload | DB node throttled: connection pool maxed, queries queued |
| Kafka Consumer Lag | Kafka node shows a "lag spike" indicator; downstream consumers backed up |
| AZ Outage | All nodes tagged as "AZ-1" go offline simultaneously |

**What needs to be built:**
- "Chaos Scenarios" dropdown in the top bar (visible when in Chaos Mode)
- Selecting a scenario applies the simulation immediately
- Each scenario has its own visual representation (different from the kill-node state)
- "Reset" button clears all active scenarios

**Acceptance Criteria:**
- [ ] "Chaos Scenarios" dropdown exists with all 4 options
- [ ] Each scenario triggers a visually distinct state on the relevant nodes/edges
- [ ] Scenarios can be selected while in Chaos Mode only (dropdown is disabled outside Chaos Mode)
- [ ] "Reset Chaos" button restores all nodes to normal state
- [ ] Only one scenario can be active at a time
- [ ] Each scenario shows a small label on affected nodes explaining what's happening

---

## EPIC 7: Latency Heatmap
> Sprint 7 | Dev 3 + Dev 4

---

### SDS-024 · Edge latency estimation model

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 7
**Priority:** High
**Story Points:** 5

**Background:**
Every connection (edge) between components has an inherent latency. We model this based on component types and configurations. This is a deterministic calculation, not AI-generated.

**Latency model:**

| Connection Type | Base Latency | Adjustments |
|---|---|---|
| Service → Cache (Redis) | 1ms | +1ms per 1GB memory miss |
| Service → Database (same region) | 5ms | +10ms per missing index; +20ms per missing read replica under load |
| Service → Service (internal) | 2ms | +5ms per additional network hop |
| Service → Kafka (produce) | 3ms | +2ms per additional partition |
| CDN → Client | 15ms | Reduces to 5ms if CDN is present |
| API Gateway → Service | 8ms | +5ms if auth middleware enabled |
| Service → S3 | 40ms | Constant |

Build a `LatencyCalculator` module that accepts two node IDs and the canvas graph, and returns `{ p50: number, p95: number, p99: number }` in milliseconds.

**Acceptance Criteria:**
- [ ] `LatencyCalculator.calculate(sourceNodeId, targetNodeId, graph)` returns p50/p95/p99
- [ ] Latency for all connection types listed in the table is implemented
- [ ] p95 is approximately 2× p50; p99 is approximately 4× p50 (rough rule of thumb for variance)
- [ ] Unit tests: Service → DB with no index returns higher latency than Service → DB with index enabled
- [ ] Edge case: if no path exists between two nodes, return null

---

### SDS-025 · Latency color-coded edges on canvas

**Type:** Story
**Assignee:** Dev 1 + Dev 4
**Sprint:** Week 7
**Priority:** High
**Story Points:** 3

**Background:**
Each edge on the canvas should be color-coded based on its estimated latency, and show the latency value in milliseconds. This gives users instant visual feedback on where the slowdowns are.

**Color coding:**
- 🟢 Green: < 10ms
- 🟡 Yellow: 10ms – 100ms
- 🔴 Red: > 100ms

**What needs to be built:**
- After a "Calculate Latency" button is clicked (or automatically after canvas changes), edges update their colors
- Each edge shows a small label with the p50 latency (e.g., "5ms")
- Hovering an edge shows a tooltip: "P50: 5ms | P95: 12ms | P99: 28ms"
- Toggle button: "Show Latency" / "Hide Latency" to switch between latency view and normal view

**Acceptance Criteria:**
- [ ] "Show Latency" toggle button exists in the top bar
- [ ] When enabled, all edges update their color based on their p50 latency
- [ ] Each edge has a label showing the p50 value in ms
- [ ] Hovering an edge shows a tooltip with p50, p95, and p99 values
- [ ] Color coding matches the spec: green / yellow / red thresholds
- [ ] Toggling "Hide Latency" restores edges to their default appearance
- [ ] Edge colors update if a node's config is changed while latency view is active

---

### SDS-026 · Critical path highlighter

**Type:** Story
**Assignee:** Dev 3 + Dev 1
**Sprint:** Week 7
**Priority:** Medium
**Story Points:** 4

**Background:**
The critical path is the slowest route through the system from client to response. Highlighting it helps the user understand where to focus their optimization efforts.

**What needs to be built:**
- Algorithm: Find the path through the graph from Client node to any terminal node that has the highest total latency (sum of all edge p50 values on the path)
- A "Show Critical Path" button highlights this path on the canvas
- All edges on the critical path glow or pulse in red/orange
- All non-critical-path edges dim slightly
- A banner at the top: "Critical path: Client → API Gateway → User Service → DB → Total: 340ms"
- The bottleneck edge (highest single latency on the path) is labeled "⚠️ Bottleneck"

**Acceptance Criteria:**
- [ ] "Show Critical Path" button exists in the top bar (visible only when latency mode is active)
- [ ] Clicking it runs the critical path algorithm and highlights the result
- [ ] The path is shown as a sequence of nodes in a banner at the top
- [ ] The highest-latency single edge on the path is labeled as the bottleneck
- [ ] Non-path edges dim to ~30% opacity
- [ ] Clicking "Show Critical Path" again deactivates the highlight
- [ ] If no "Client" node exists, show an error: "Add a Client node to calculate critical path"

---

## EPIC 8: Traffic Simulation & Scaling
> Sprint 8 | Dev 3 + Dev 2

---

### SDS-027 · Traffic spike simulator

**Type:** Story
**Assignee:** Dev 3
**Sprint:** Week 8
**Priority:** High
**Story Points:** 5

**Background:**
The traffic simulator gradually increases RPS on the canvas and shows which components start struggling. This makes capacity planning tangible — the user can see their system "breaking" before it does in production.

**What needs to be built:**
- "Run Traffic Simulation" button in top bar
- Opens a simulation control panel with:
  - Start RPS (default: current load panel value)
  - End RPS (default: 10× start)
  - Ramp duration: 10s / 30s / 60s (visual only, not actual wall-clock time)
- An animated progress bar shows current RPS as it increases
- As RPS increases, nodes that exceed their capacity threshold change color:
  - Yellow: > 70% capacity
  - Red: > 100% capacity (overloaded)
- Simulation auto-stops when any node hits 100% capacity

**Acceptance Criteria:**
- [ ] "Run Traffic Simulation" button opens the simulation control panel
- [ ] User can configure start RPS, end RPS, and ramp duration
- [ ] "Start Simulation" begins incrementing RPS visually on canvas
- [ ] Nodes change color as they approach and exceed capacity
- [ ] Simulation pauses and shows which node was the first to overload
- [ ] A result summary shows: "System broke at [X] RPS — [Component Name] was the first to fail"
- [ ] "Reset" button returns canvas to pre-simulation state

---

### SDS-028 · Auto-scaling visualization

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 8
**Priority:** Medium
**Story Points:** 3

**Background:**
For Service nodes with auto-scaling enabled, the simulation should show instances being added as load increases. This makes auto-scaling visible and understandable.

**What needs to be built:**
- Service nodes with auto-scaling ON show a small "instance count" badge
- During traffic simulation, as load increases, the badge count increments
- A brief animation when instances are added (e.g., a small "node splits" or "+1" floating animation)
- Max instance count (from config) shown as a limit: "3/10 instances" badge
- When max instances are reached and load still increases, the node turns red (auto-scaling limit hit)

**Acceptance Criteria:**
- [ ] Service nodes with auto-scaling ON show an instance count badge
- [ ] Badge increments during simulation as load increases
- [ ] "+1 instance" animation is visible when scaling out
- [ ] Badge shows "current / max" format (e.g., "4/10")
- [ ] When max is reached, node turns red
- [ ] Nodes without auto-scaling simply turn red when their single instance is overloaded

---

### SDS-029 · Breaking point finder (AI)

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 8
**Priority:** Medium
**Story Points:** 3

**Background:**
After running the traffic simulation, the user wants to know the exact RPS where their system breaks. The AI confirms the calculation and explains the failure mode in plain English.

**What needs to be built:**
- After a simulation run completes, "Get AI Analysis" button appears in the result summary
- Calls `POST /api/breaking-point` with canvas JSON + simulation results
- AI response:
```json
{
  "breaking_point_rps": 12000,
  "first_failure_component": "Primary DB",
  "explanation": "Your PostgreSQL instance can handle ~240 concurrent connections. At 12K RPS with average query time of 5ms, you'll exhaust the connection pool. Solution: add read replicas and implement connection pooling via PgBouncer.",
  "next_bottleneck": "After fixing the DB, your API Gateway becomes the next bottleneck at ~35K RPS."
}
```
- Results displayed in the simulation summary panel

**Acceptance Criteria:**
- [ ] "Get AI Analysis" button appears after simulation completes
- [ ] API call is made with the simulation results included in the request
- [ ] Breaking point RPS is shown prominently
- [ ] Explanation text is shown below the RPS number
- [ ] "Next bottleneck" is shown if one is identified
- [ ] If system never breaks within the simulation range, AI says "System handles [max RPS] — no breaking point found in simulation range"

---

## EPIC 9: Template Library
> Sprint 9 | Dev 1 + Dev 2

---

### SDS-030 · Template library — pre-built architectures

**Type:** Story
**Assignee:** Dev 1 + Dev 2
**Sprint:** Week 9
**Priority:** Medium
**Story Points:** 5

**Background:**
Not all users want to start from scratch. Templates give them a realistic starting point and something to analyze and improve. They also serve as learning tools.

**Templates to build (as static JSON canvas files):**

| Template | Difficulty | Key components |
|---|---|---|
| URL Shortener | Beginner | LB, API, DB, Cache, CDN |
| Twitter Feed (read-heavy) | Mid-level | LB, API, DB cluster, Cache, Kafka, CDN |
| Ride-sharing (Uber-like) | Senior | Multiple services, WebSocket, Kafka, GPS service, DB sharding |
| Video Streaming (Netflix-like) | Staff | CDN-heavy, transcoding service, recommendation engine, multi-region |

**What needs to be built:**
- "Templates" button or tab in the top navigation
- Opens a modal showing template cards (thumbnail preview, name, difficulty badge, key features)
- Clicking a template asks: "This will replace your current canvas. Continue?" → Yes/No
- Selecting a template loads it onto the canvas with all nodes, edges, and configs pre-populated
- Each template has a "Recommended RPS" pre-set in the load panel

**Acceptance Criteria:**
- [ ] Template modal opens from the top navigation
- [ ] All 4 templates are listed with name, difficulty badge, and description
- [ ] Selecting a template shows a confirmation dialog before replacing the canvas
- [ ] Loaded template populates nodes, edges, and configurations correctly
- [ ] Load panel updates with the template's recommended RPS
- [ ] Templates are read-only starting points — user can modify after loading
- [ ] A "Start from scratch" option clears the canvas

---

### SDS-031 · "What's wrong with this design?" — AI template roast

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 9
**Priority:** Low
**Story Points:** 2

**Background:**
A fun and educational feature — after loading a template, the user can click "What's wrong with this design?" and the AI points out intentional flaws baked into the template. This teaches through critique.

**What needs to be built:**
- Each template has 3–5 intentional design flaws baked into its configuration (e.g., no caching, single DB instance, no CDN)
- "What's wrong with this design?" button appears after a template is loaded
- Triggers a standard AI analysis call (reuses SDS-011)
- The analysis panel results are framed as: "Here are the intentional design problems in this template:"
- Each suggestion links back to the template flaw

**Acceptance Criteria:**
- [ ] Each template has at least 3 intentional flaws in its config
- [ ] "What's wrong?" button appears in the top bar when a template is active
- [ ] Clicking it triggers analysis and shows results in the suggestions panel
- [ ] Results are labeled as "Template Flaw" suggestions, not generic analysis
- [ ] At least 3 critical or warning issues are found on every template

---

## EPIC 10: AI Chat Assistant
> Sprint 10 | Dev 2

---

### SDS-032 · Canvas-aware AI chat panel

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 10
**Priority:** Critical
**Story Points:** 8

**Background:**
The AI chat assistant is the most interactive feature in the product. It's a chat panel that's fully aware of the current canvas state. Users can ask questions in plain English and get answers grounded in their specific architecture.

**What needs to be built:**
- Right-side chat panel toggled via a "🤖 Ask AI" button
- Panel shows a chat thread (messages from user + AI)
- Every message to the AI includes the full serialized canvas JSON as context
- Chat history is maintained within the session (not cross-session — no persistence required in this ticket)
- Input box at the bottom + "Send" button (also submits on Enter)
- AI responses stream in (token by token), not all-at-once
- When the AI mentions a component (e.g., "your database"), that node on canvas gets a brief highlight pulse

**Example queries the AI should handle:**
- "Why is my Kafka slow?"
- "Where should I add a CDN?"
- "How do I make this handle 1M users?"
- "Explain why this design would fail a Google interview"

**Acceptance Criteria:**
- [ ] Chat panel opens from "Ask AI" button and coexists with the canvas
- [ ] User can type a question and receive a response from Claude
- [ ] Every AI request includes the full current canvas JSON as context
- [ ] AI responses reference specific node names from the canvas (not generic answers)
- [ ] Response streams in token-by-token (not a loading spinner then instant response)
- [ ] When the AI mentions a node name, that node pulses briefly on canvas
- [ ] Chat history persists within the session (doesn't clear on panel close/reopen)
- [ ] Empty state shows: "Ask me anything about your architecture..."

---

### SDS-033 · AI canvas modification via chat

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 10
**Priority:** Medium
**Story Points:** 5

**Background:**
The AI should be able to modify the canvas based on chat instructions. This is the highest-wow interaction — the user says "add a load balancer between the API and the services" and it happens.

**What needs to be built:**
- When Claude determines that the user wants a canvas change, it returns a structured action alongside its explanation:
```json
{
  "response_text": "I'll add a Redis cache between your API Gateway and User Service to reduce DB load.",
  "canvas_actions": [
    { "action": "add_node", "type": "cache", "label": "Redis Cache", "position": { "x": 500, "y": 300 } },
    { "action": "add_edge", "source": "api-gateway-1", "target": "new-cache-node" },
    { "action": "add_edge", "source": "new-cache-node", "target": "user-service-1" }
  ]
}
```
- Frontend applies these actions to the canvas
- A "Undo AI change" button appears for 10 seconds after any AI-driven canvas modification

**Acceptance Criteria:**
- [ ] AI chat can add nodes to the canvas via structured action response
- [ ] AI chat can add edges between existing nodes
- [ ] Canvas updates immediately after AI responds (not after a separate "Apply" click)
- [ ] "Undo AI change" button appears for 10 seconds after any canvas modification
- [ ] Undo restores the canvas to its pre-AI-modification state
- [ ] AI only modifies canvas when it detects an explicit instruction (not for analysis questions)

---

## EPIC 11: Interview Mode
> Sprint 11 | Dev 1 + Dev 2

---

### SDS-034 · Interview mode — problem prompt + timer

**Type:** Story
**Assignee:** Dev 1 + Dev 2
**Sprint:** Week 11
**Priority:** Critical
**Story Points:** 5

**Background:**
Interview Mode transforms the product into a system design interview simulator. The AI gives the user a problem, they have 30–45 minutes to design on the canvas, and then they get scored. This is the feature that differentiates the product for the target audience.

**Problem bank (at least 5 prompts):**
- Design a URL shortener for 100M users
- Design a Twitter-like feed for 500M users
- Design a real-time chat system for 10M concurrent users
- Design a ride-sharing system like Uber
- Design a video streaming platform like YouTube

**What needs to be built:**
- "Interview Mode" button in top navigation
- Clicking it shows a problem selection screen (or random problem option)
- User selects a problem → modal shows: problem statement, constraints, and hints toggle
- A timer starts (default 45 minutes, configurable to 30 or 60)
- Timer shown in top bar throughout the interview
- Canvas is blank for the user to build on
- "End Interview & Get Score" button stops the timer and triggers scoring

**Acceptance Criteria:**
- [ ] Interview Mode button opens the problem selection screen
- [ ] At least 5 problem prompts are available
- [ ] "Random" option picks a problem randomly
- [ ] Problem statement is clearly shown with constraints (e.g., "Handle 100M users, 99.99% uptime")
- [ ] Timer starts when the user confirms the problem
- [ ] Timer is always visible in the top bar during the interview
- [ ] Timer runs out of time: shows a warning at 5 minutes remaining, auto-submits at 0
- [ ] "End Interview" button is clearly accessible at all times during the interview

---

### SDS-035 · AI scoring engine

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 11
**Priority:** Critical
**Story Points:** 6

**Background:**
At the end of the interview, the AI evaluates the canvas against the problem requirements and gives a score across multiple dimensions. This is the key deliverable that makes Interview Mode valuable.

**Scoring dimensions (each 1–10):**
- Scalability — does the design handle the stated scale?
- Reliability — are there redundancy and failover mechanisms?
- Cost Efficiency — is the design appropriately economical?
- Completeness — are all required components present?

**What needs to be built:**
- On "End Interview": calls `POST /api/score-interview`
  - Request: `{ problem_id, canvas_json, time_taken_seconds }`
  - Response:
```json
{
  "overall_score": 7.2,
  "dimension_scores": {
    "scalability": 8,
    "reliability": 6,
    "cost_efficiency": 7,
    "completeness": 7
  },
  "missing_components": ["Rate Limiter", "CDN", "Read Replicas"],
  "strengths": ["Good use of Kafka for async processing", "Load balancer correctly placed"],
  "improvements": ["DB is a single point of failure — add Multi-AZ", "No CDN for static assets"],
  "verdict": "Strong mid-level design. Would pass a mid-level interview; needs more reliability focus for senior."
}
```
- Results shown in a full-screen "Score Card" modal

**Acceptance Criteria:**
- [ ] Score card appears after "End Interview" is clicked
- [ ] Overall score prominently displayed (e.g., "7.2 / 10")
- [ ] All 4 dimension scores shown (e.g., as a radar chart or score bars)
- [ ] Missing components list shown as checklist (unchecked = missing)
- [ ] Strengths and improvements shown as separate lists
- [ ] Verdict text (the summary sentence) shown at bottom
- [ ] Score card has a "Share" button (generates a static image or link — see SDS-036)

---

### SDS-036 · Shareable score card

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 11
**Priority:** Medium
**Story Points:** 3

**Background:**
Users should be able to share their interview score publicly — for LinkedIn, portfolio pages, or just bragging rights. This also serves as organic marketing for the product.

**What needs to be built:**
- "Share Score" button on the score card modal
- Generates a static PNG of the score card (using html2canvas or similar)
- Image includes: problem name, overall score, dimension scores, verdict, and product branding
- Also generates a shareable URL (e.g., `app.com/score/abc123`) that shows a read-only version of the score card
- The shareable URL page shows the score without requiring login

**Acceptance Criteria:**
- [ ] "Share Score" button is visible on the score card
- [ ] Clicking it generates a PNG download of the score card
- [ ] PNG includes: problem, overall score, all 4 dimension scores, verdict, and product name/logo
- [ ] A shareable link is also generated and copied to clipboard
- [ ] Shareable link opens a read-only score card page (no auth required)
- [ ] Shareable page renders correctly on mobile

---

## EPIC 12: Export & Sharing
> Sprint 12 | Dev 1 + Dev 4

---

### SDS-037 · Export canvas as PNG / PDF

**Type:** Story
**Assignee:** Dev 1
**Sprint:** Week 12
**Priority:** Medium
**Story Points:** 3

**What needs to be built:**
- "Export" dropdown in top navigation: "Export as PNG" and "Export as PDF"
- PNG export: uses React Flow's built-in export or html2canvas to render the canvas as a high-res image
- PDF export: wraps the PNG in a PDF with a title, date, and optional AI summary appended
- Export captures the full canvas (all nodes, not just the viewport)
- Filename: `[design-name]-architecture-[date].png`

**Acceptance Criteria:**
- [ ] "Export" dropdown with PNG and PDF options exists in top navigation
- [ ] PNG export downloads a full-canvas image (not just the visible viewport)
- [ ] PNG resolution is at least 2x for retina screens
- [ ] PDF export includes: canvas image, design name, export date
- [ ] Exported file downloads automatically to the user's default download location
- [ ] Export works even if nodes are outside the current viewport

---

### SDS-038 · Export canvas as JSON + import

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 12
**Priority:** Low
**Story Points:** 2

**What needs to be built:**
- "Export JSON" option in the Export dropdown
- Exports the full canvas serialization (same format as SDS-010)
- "Import JSON" button that accepts a previously exported JSON file and loads it onto the canvas
- Import shows a confirmation: "This will replace your current canvas. Continue?"

**Acceptance Criteria:**
- [ ] "Export JSON" downloads a `.json` file with the full canvas state
- [ ] "Import JSON" button accepts a `.json` file via file picker
- [ ] Importing a valid JSON correctly reconstructs the canvas (nodes, edges, configs)
- [ ] Importing an invalid/malformed JSON shows an error toast ("Invalid file format")
- [ ] Import confirmation dialog appears before replacing current canvas

---

### SDS-039 · Shareable read-only link

**Type:** Story
**Assignee:** Dev 2
**Sprint:** Week 12
**Priority:** Medium
**Story Points:** 4

**What needs to be built:**
- "Share" button in top navigation
- Clicking "Share" saves the current canvas state to a database and returns a unique URL
- URL format: `app.com/design/[unique-id]`
- Visiting the URL shows the canvas in read-only mode (no editing, no buttons)
- Read-only view shows: the diagram, node configs on hover, and the AI analysis results (if analysis was run before sharing)
- Shared link does not expire

**Acceptance Criteria:**
- [ ] "Share" button generates and copies a unique link to clipboard
- [ ] Toast confirms: "Link copied to clipboard!"
- [ ] Visiting the link shows the canvas in read-only mode
- [ ] Node configs are visible on hover/click in read-only mode
- [ ] Analysis badges are shown if analysis was run before sharing
- [ ] Read-only mode has no editable controls (no drag, no config panel editing)
- [ ] Link is permanent (doesn't expire)

---

## Definition of Done (applies to all tickets)

A ticket is considered complete when all of the following are true:

1. All acceptance criteria are checked and verified
2. Code is reviewed by at least one other team member
3. No console errors or warnings in the browser related to the ticket's feature
4. Feature works on Chrome and Firefox (Safari is nice-to-have)
5. Feature works at 1280×800 minimum screen resolution
6. Loading states and error states are handled (no broken blank states)
7. The feature is demonstrated working in a short screen recording or live demo to the team

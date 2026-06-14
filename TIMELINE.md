# 2-3 Month Roadmap: System Design Simulator

## Team Structure (3-4 people)
- **Dev 1** — Canvas & Frontend (React Flow, UI)
- **Dev 2** — Backend & AI Integration (Node.js, Claude API)
- **Dev 3** — Simulation Engine (cost calc, failure logic)
- **Dev 4 (optional)** — UI/UX + Data viz (charts, animations)

---

## Month 1 — "The Foundation"
### Goal: A working canvas that talks to AI

---

### Week 1 — Canvas Core *(Dev 1 + Dev 2)*
- [ ] React Flow canvas setup with drag/drop
- [ ] Component library: Client, LB, API Gateway, Service, Cache, DB, Kafka, CDN, S3
- [ ] Connect nodes with directional arrows
- [ ] Basic sidebar with component palette
- [ ] Node selection highlights the component

---

### Week 2 — Component Configuration *(Dev 1 + Dev 3)*
- [ ] Config panel per component (click a node → side panel opens)
- [ ] Kafka config: partitions, replication factor, retention
- [ ] DB config: type (SQL/NoSQL), read replicas, indexing on/off
- [ ] Service config: instance count, RPS limit, memory
- [ ] Cache config: TTL, eviction policy, size
- [ ] Load panel: RPS input, payload size, peak multiplier

---

### Week 3 — AI Failure Analysis *(Dev 2 + Dev 1)*
- [ ] Serialize canvas to graph JSON
- [ ] Claude API integration on backend
- [ ] Prompt engineering for architectural analysis
- [ ] Parse AI response into structured annotations
- [ ] Overlay red/yellow/green badges on failing nodes
- [ ] "Analyze System" button with loading state

---

### Week 4 — Suggestion Engine *(Dev 2 + Dev 3)*
- [ ] AI suggestion panel (ranked list of fixes)
- [ ] Each suggestion links to the affected node on canvas
- [ ] Severity tagging: Critical / Warning / Optimization
- [ ] "Apply Suggestion" button that auto-updates node config
- [ ] Re-analyze after applying suggestion (diff view)

---

**Month 1 Deliverable:** Working simulator — build a system, click analyze, get AI feedback with canvas highlights

---

## Month 2 — "The WOW Features"
### Goal: Cost estimation, failure simulation, real-time metrics

---

### Week 5 — Cost Estimation Engine 💰 *(Dev 3 + Dev 2)*
> **This is your most exclusive feature**

- [ ] Per-component cost model (based on AWS/GCP pricing)
  - EC2-equivalent for services
  - RDS pricing for databases
  - MSK pricing for Kafka
  - ElastiCache for Redis
  - S3, CloudFront, API Gateway
- [ ] Monthly cost breakdown panel
- [ ] Cost-per-request calculator
- [ ] "Cost at scale" slider — drag from 1K to 10M users, watch cost change live
- [ ] Highlight most expensive components in the architecture
- [ ] AI suggests cheaper alternatives ("Switch to Aurora Serverless, save ~40%")

---

### Week 6 — Failure Simulation Mode 🔥 *(Dev 3 + Dev 1)*
> **The most visually impressive feature**

- [ ] "Kill a node" mode — click any component and take it offline
- [ ] System shows which downstream services cascade-fail (red wave animation)
- [ ] AI explains the blast radius: "Killing this service affects 3 downstream consumers"
- [ ] Recovery path suggestions shown on canvas
- [ ] Chaos scenarios: Network partition, DB overload, Kafka consumer lag spike
- [ ] SLA impact: "This failure = 23 min downtime, violates 99.9% SLA"

---

### Week 7 — Latency Heatmap ⚡ *(Dev 3 + Dev 4)*
- [ ] Each edge (connection) shows estimated latency in ms
- [ ] Color-coded edges: green (<10ms), yellow (10-100ms), red (>100ms)
- [ ] "Critical path" highlighter — shows the slowest path through the system
- [ ] P50 / P95 / P99 latency estimates per request flow
- [ ] Bottleneck detector: "This DB call is 340ms, killing your P99"
- [ ] AI suggests: "Add Redis cache here, reduces this to ~2ms"

---

### Week 8 — Traffic Simulation & Scaling *(Dev 3 + Dev 2)*
- [ ] Traffic spike simulator — gradually increase RPS on canvas
- [ ] Auto-scaling visualization (service boxes multiply when load hits threshold)
- [ ] Kafka consumer lag visualization (fills up like a progress bar)
- [ ] DB connection pool exhaustion indicator
- [ ] "Breaking point" finder — AI tells you exact RPS where system collapses
- [ ] Horizontal vs vertical scaling comparison mode

---

**Month 2 Deliverable:** Full simulation platform — cost breakdown, failure chaos mode, latency heatmap, and scaling simulation

---

## Month 3 — "The Polish & Exclusive Layer"
### Goal: Templates, AI chat, export, sharing — makes it feel like a real product

---

### Week 9 — Template Library *(Dev 1 + Dev 2)*
- [ ] Pre-built architectures: Netflix clone, Uber clone, WhatsApp clone, Twitter feed
- [ ] Each template pre-configured with realistic numbers
- [ ] "What's wrong with this design?" — AI roasts the template
- [ ] User can fork a template and modify it
- [ ] Difficulty tags: Beginner / Mid-level / Senior / Staff

---

### Week 10 — AI Chat Assistant 🤖 *(Dev 2)*
> **The most interactive exclusive feature**

- [ ] Side chat panel alongside the canvas
- [ ] Canvas-aware AI: "Why is my Kafka slow?" → AI looks at your actual config
- [ ] Ask questions like:
  - *"How do I make this system handle 1M users?"*
  - *"Where should I add a CDN?"*
  - *"Explain why this design would fail a Google interview"*
- [ ] AI can modify canvas based on chat ("Add a load balancer between these two")
- [ ] Chat history saved per design

---

### Week 11 — Interview Mode 🎯 *(Dev 1 + Dev 2)*
> **Unique positioning feature for your audience**

- [ ] AI acts as a system design interviewer
- [ ] Gives you a problem: "Design a URL shortener for 100M users"
- [ ] Timer starts, you build on canvas
- [ ] AI scores your design at the end:
  - Scalability (1-10)
  - Reliability (1-10)
  - Cost efficiency (1-10)
  - Missing components checklist
- [ ] Detailed feedback report: "You forgot rate limiting, no CDN, DB is a SPOF"
- [ ] Shareable score card (great for LinkedIn/portfolio)

---

### Week 12 — Export, Share & Embed *(Dev 1 + Dev 4)*
- [ ] Export as PNG / PDF architecture diagram
- [ ] Export as structured JSON (importable)
- [ ] Shareable link (read-only view of your design)
- [ ] Embed widget for portfolio/blog
- [ ] "Architecture Report" PDF — full AI analysis + cost breakdown + suggestions
- [ ] GitHub README-ready diagram export

---

## Feature Priority Matrix

| Feature | Wow Factor | Build Effort | Priority |
|---|---|---|---|
| AI Failure Analysis | ⭐⭐⭐⭐⭐ | Medium | Month 1 |
| Cost Estimation | ⭐⭐⭐⭐⭐ | Medium | Month 2 |
| Kill-a-node chaos mode | ⭐⭐⭐⭐⭐ | High | Month 2 |
| Latency Heatmap | ⭐⭐⭐⭐ | Medium | Month 2 |
| AI Chat (canvas-aware) | ⭐⭐⭐⭐⭐ | High | Month 3 |
| Interview Mode + Scoring | ⭐⭐⭐⭐⭐ | Medium | Month 3 |
| Shareable Score Card | ⭐⭐⭐⭐ | Low | Month 3 |
| Template Library | ⭐⭐⭐ | Low | Month 3 |

---

## The Killer Demo Flow (what impresses anyone)

```
1. Open a blank canvas
2. Build a "Twitter-like" system in 3 minutes
3. Set load to 500K RPS
4. Click "Analyze" → AI highlights 4 failure points
5. Click "Kill DB node" → cascade failure animation plays
6. Open cost panel → "$47,000/month, here's how to cut it to $12K"
7. Enter Interview Mode → get scored 7.2/10 with detailed feedback
8. Export shareable score card
```

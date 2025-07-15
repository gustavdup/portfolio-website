---
title: "Carbone.io Middleman with Reporting & Cost Tracking"
date: "2024"
tags: ["Document Automation", "Reporting", "Integration", "API", "Internal Tooling"]
tech: ["Carbone.io", "Azure Logic Apps", "PostgreSQL", "Metabase"]
summary: "Developed a backend service to automate PDF document generation, log metadata for each operation, and generate team- and client-level reports using a custom integration with Azure and Metabase."
featured: true
order: 1
---

## **Overview**

Carbone.io is a powerful, template-based document generation engine that fits seamlessly into serverless architectures. It’s excellent at producing PDFs on the fly — but it lacks built-in reporting. That limitation became a launch point for this internal project: building a **middleman service layer** to integrate Carbone with Azure Logic Apps and a PostgreSQL database for rich reporting and cost tracking.

---

## **Project Goals**

1. Create a serverless, reusable middleware that simplifies Carbone API usage.
2. Enable metadata logging of each PDF generation (team, client, project, etc.).
3. Introduce cost-awareness by tracking usage volume per team.
4. Provide reportable data in Metabase for visibility and accountability.

---

## **Architecture Overview**

The solution uses **three Azure Logic Apps**, each performing one critical step in the Carbone document lifecycle:

- **create-template**: Upload and register the document template.
- **generate-document**: Merge data into a chosen template to generate a PDF.
- **render-document**: Retrieve and return the final document.

All three steps interact with a **PostgreSQL database**, where metadata from each operation is logged in real time.

---

## **Middleman Parameters**

Every document operation is tagged with:

- team
- client
- project
- product
- source

These parameters allow detailed filtering and cost attribution. For example, setting source to "Postman" excludes test runs from billing.

---

## **User Workflow**

### 1. **Upload Template**
Users call the create-template Logic App with form-data, specifying team, template, and optionally client, project, and more.

**Response:** A templateId for future use.

---

### 2. **Generate Document**
Users post a JSON payload with:
- Data matching their template variables.
- Metadata (team, client, project, etc.).
- Their templateId.

**Response:** A renderId used to retrieve the final document.

---

### 3. **Download Document**
Users send a simple JSON to the render-document Logic App with renderId and team. The response is the generated PDF.

---

## **Reporting Layer**

All logic app executions write logs to PostgreSQL. This data feeds a Metabase dashboard, showing:

- Total runs per team or client.
- Effective document cost calculations.
- Monthly usage trends.

**Cost Breakdown Example:**

| Range               | Docs | Rate  | Total   |
|---------------------|------|-------|---------|
| 1–100               | 100  | $0.10 | $10.00  |
| 101–1000            | 900  | $0.05 | $45.00  |
| 1001–1317           | 317  | $0.02 | $6.34   |
| **Total**           |1317  |       | **$61.34** |
| **Effective Rate**  |      |       | **$0.0466** per doc |

---

## **Dashboard Overview**

Included in the dashboard are:

- Template creation logs.
- Generation statistics by team, client and month.
- Effective rates accross the organisation.

---

## **Challenges & Learnings**

- **Data Structure Design:** Mapping parameters like project and source consistently proved vital for meaningful reports.
- **Cost Attribution:** Carbone’s volume-based pricing made cost division per client nuanced — this solution handles it transparently.
- **Reliability:** Azure Logic Apps provided retry policies and failure alerting out of the box.

---

## **Outcome**

The middleware allows each team to confidently:
- Track document generation activity.
- Attribute costs to the right clients.
- Have transparency around costs.

---

## **Tech Stack**

| Component            | Technology          |
|----------------------|---------------------|
| PDF Generator        | Carbone.io          |
| Middleman Layer      | Azure Logic Apps    |
| Storage & Logs       | PostgreSQL on Azure |
| Reporting            | Metabase            |

---

## **Conclusion**

This project filled a critical gap between a powerful tool (Carbone.io) and enterprise requirements (reporting, billing, traceability). The middleware  ensures **visibility, accountability, and cost-effectiveness**.

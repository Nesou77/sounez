# Sounez analytics events (GTM / GA4)

Events are pushed to `window.dataLayer` from `lib/analytics.ts` (browser-only). Google Tag Manager should listen with **Custom Event** triggers and forward to GA4 with **GA4 Event** tags.

No personal data (names, emails, phone numbers, message bodies, addresses) is sent to the dataLayer. AdSense interactions are **not** tracked in JavaScript; use the official **GA4 ↔ AdSense** integration for monetization metrics.

## Recommended GA4 key events

| Priority   | Event            | Role |
|-----------|------------------|------|
| Primary   | `tool_complete`  | Core tool success / result delivered |
| Secondary | `copy_result`    | User copied an output |
| Secondary | `download_result`| User downloaded a file |
| Secondary | `share`          | User used a share action (when present) |
| Secondary | `generate_lead` | Contact form success only |

Also use `tool_view`, `search`, and `select_content` for SEO and discovery funnels.

## Implemented events

### `tool_view`

**When:** A tool page client mounts (`useToolView` in each tool’s `*Client.tsx`).

**Parameters:**

| Name            | Type   | Description        |
|-----------------|--------|--------------------|
| `tool_slug`     | string | Tool id / URL slug |
| `tool_name`     | string | Optional display name |
| `tool_category` | string | Optional category slug |
| `page_path`     | string | `location.pathname` |

---

### `tool_complete`

**When:** The user successfully completes the main tool action (e.g. compressed image ready, palette generated, captions returned, calculation run).

**Parameters:**

| Name             | Type   | Description |
|------------------|--------|-------------|
| `tool_slug`      | string | Tool id |
| `tool_name`      | string | Optional |
| `tool_category`  | string | Optional |
| `output_type`    | string | Short label for the result kind |

---

### `copy_result`

**When:** The user copies text or code produced by the tool.

**Parameters:**

| Name          | Type   | Description |
|---------------|--------|-------------|
| `tool_slug`   | string | Tool id |
| `result_type` | string | e.g. `css_gradient`, `caption` |

---

### `download_result`

**When:** The user downloads a generated file.

**Parameters:**

| Name          | Type   | Description |
|---------------|--------|-------------|
| `tool_slug`   | string | Tool id |
| `result_type` | string | Logical output id |
| `file_type`   | string | Optional extension / MIME hint |

---

### `search`

**When:** The user types in the homepage hero tool search or the `/tools` search (debounced; fires for zero or more matches).

**Parameters:**

| Name            | Type   | Description |
|-----------------|--------|-------------|
| `search_term`   | string | Query (trimmed) |
| `result_count`  | number | Number of tools matched |

---

### `select_content`

**When:** The user opens a tool from homepage search results, keyboard selection, or from the `/tools` grid while a search query is active.

**Parameters:**

| Name            | Type   | Description |
|-----------------|--------|-------------|
| `content_type`  | string | Always `tool` |
| `item_id`       | string | Tool slug |
| `search_term`   | string | Optional active query |

---

### `share`

**When:** The user triggers a share action from the blog engagement share menu (copy link, WhatsApp, X, Facebook).

**Parameters:**

| Name         | Type   | Description |
|--------------|--------|-------------|
| `tool_slug`  | string | Context id (`blog:<post-slug>` for articles) |
| `method`     | string | Optional: `copy_link`, `whatsapp`, `twitter`, `facebook` |

---

### `generate_lead`

**When:** The contact API returns success (`ContactClient`).

**Parameters:**

| Name          | Type   | Description |
|---------------|--------|-------------|
| `form_name`   | string | `contact_form` |
| `lead_topic`  | string | Optional topic key (e.g. `Bug report`) |
| `page_path`   | string | Pathname when submitted |

No form field values are included.

---

## Google Tag Manager setup

1. Create **Custom Event** triggers for each event name:
   - `tool_view`
   - `tool_complete`
   - `copy_result`
   - `download_result`
   - `search`
   - `select_content`
   - `share`
   - `generate_lead`

2. For each trigger, add a **GA4 Event** tag:
   - Event name: match the custom event (or map to GA4 recommended names where appropriate).
   - Include relevant **Event parameters** from the dataLayer (use GTM variables).

3. In GA4, mark **`tool_complete`** as a **Key event** (and optionally `copy_result`, `download_result`, `share`). Use `generate_lead` only if you want contact volume as a secondary business signal.

4. Link **AdSense** to GA4 in the Google ecosystem; do not implement custom ad click tags on the site.

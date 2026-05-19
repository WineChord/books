# Claude Code Interview Book Spec

This book is a single-page interactive lesson published at `/books/cc/`.
It is written for absolute beginners and teaches Claude Code context
management, memory, compaction, multi-agent design, and interview answers.

## Source Contract

The page must cover the three user-provided WeChat links and the same-topic
internal links that were reachable from them.

The first WeChat article was read directly. It covers context windows, common
context-management failures, the five-layer compression pyramid,
Auto-Compact, summary prompt design, continuation after compaction, and
interview answer framing.

The second and third WeChat links returned WeChat verification pages during
local retrieval. Their readable authorized mirrors were used instead:

1. `https://www.eefocus.com/article/1984643.html`
2. `https://www.eefocus.com/article/2009921.html`

The page also cross-checks public Claude Code capabilities against Anthropic
documentation for subagents, memory, MCP, and slash commands.

## Route Contract

1. `src/pages/cc/index.astro` renders the primary Chinese page.
2. `src/pages/zh/cc/index.astro` renders the same Chinese page for the
   existing Chinese route pattern.
3. With the Astro `base` value, the public URL is `/books/cc/`.
4. The spec page is available at `/books/cc/spec.html` and
   `/books/zh/cc/spec.html`.

## Coverage Contract

The page must explain these topics from first principles:

1. chat, copilot, and agent differences;
2. token, context window, system prompt, history, tool definition, tool use,
   and tool result;
3. why coding agents consume context faster than ordinary chat;
4. why larger windows do not remove the need for context management;
5. why sliding windows, fixed-interval summaries, and vector recall are
   insufficient for agent histories;
6. the five-layer compression pyramid: disk spill, Snip, Micro-Compact,
   Context Collapse, and Auto-Compact;
7. Auto-Compact trigger, 13K buffer, manual versus automatic compaction,
   circuit breaker, recursive guard, full rewrite, and restoration channels;
8. summary prompt design, XML structure, nine summary sections, all user
   messages, and current work;
9. continuation after compaction through boundary markers, summary,
   attachments, hook results, and transcript fallback;
10. memory versus context versus summary;
11. Subagent, Fork Subagent, Coordinator, tool isolation, context isolation,
    message queues, and completion notifications;
12. practical interview answers in short, medium, and follow-up forms.

## Interaction Contract

The page must include interactive or visual explanations for:

1. token budget pressure and compaction trigger thresholds;
2. the five compression layers;
3. the Auto-Compact pipeline;
4. the nine-section summary prompt;
5. memory types and restoration channels;
6. multi-agent communication;
7. interview Q&A cards.

The original article images are not hotlinked into the published page. Their
diagram intent is reconstructed as first-party interactive visuals and
explanatory text.

## Quality Contract

1. The page must build with `npm run build`.
2. The page must pass the repository content and dist checks.
3. Published HTML must not contain local machine paths or private environment
   details.
4. The page must be responsive on desktop and mobile.
5. The page must remain readable without JavaScript, with JavaScript only
   enhancing the diagrams.

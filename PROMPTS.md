# PROMPTS.md

## Purpose

This file contains the core prompts used to run the PLV website factory workflow inside Codex.

The workflow is simple:

1. Start with a rough client idea
2. Use the **Brief Builder Prompt**
3. Review and refine the brief
4. Use the **Build Executor Prompt**
5. Review the diff and preview deployment
6. Create PR
7. Merge to `main` when approved

---

# 1. Brief Builder Prompt

Use this first for any **new website build**, major rebuild, or major industry adaptation.

```text
Take my rough idea and convert it into a complete website build brief before writing code.

Output:
1. Business type
2. Target audience
3. Primary CTA
4. Recommended pages
5. Homepage section order
6. Visual direction
7. Copy direction
8. Trust elements needed
9. SEO direction
10. Features to include
11. Features to avoid
12. Step-by-step implementation plan

Rules:
- Do not write code yet
- Keep the brief commercially strong, premium, and easy for non-technical users to understand
- Base the recommendation on the existing starter structure in this repo
- Make the direction feel custom to the client, not generic
- Avoid filler sections, buzzwords, and vague recommendations

Idea:
[PASTE CLIENT IDEA HERE]

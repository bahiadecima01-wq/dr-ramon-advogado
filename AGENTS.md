<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep the original lawyer portrait as a bundled image import for external-host portability; Lovable's origin-relative asset endpoint is not served by Vercel.
- Bundle official logo artwork as an imported local image and derive the favicon from its supplied symbol; external hosts must not depend on Lovable asset endpoints.
- Use the shared public-origin SEO configuration for canonical, social metadata, structured data and sitemap; update the static robots sitemap directive on domain changes so crawlers use the same origin.
- Derive sitemap entries from explicit required route decisions using the versioned helper, excluding endpoint routes and omitting lastmod without authoritative page-specific dates.
- Keep share-sized portrait derivatives separate from the bundled on-page original so SEO does not alter the visible photograph.

- Keep WhatsApp contact validation and URL construction in a browser-safe tested helper; this user-chosen handoff has no storage or server submission.
- Bundle manually selected Reel covers locally as accessible external publication links with decorative play overlays; avoid embedded players so the gallery remains portable and independent of Instagram playback restrictions.

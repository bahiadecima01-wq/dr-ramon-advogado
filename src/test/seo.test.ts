import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { resolveSiteOrigin, legalService } from "@/lib/seo";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

describe("Public SEO rules", () => {
  it("uses the known public domain until an official domain is configured", () => {
    expect(resolveSiteOrigin(undefined)).toBe("https://dr-ramon-advogado.lovable.app");
  });
  it("supports an official domain without retaining the prior domain", () => {
    expect(resolveSiteOrigin("https://advocacia.example/")).toBe("https://advocacia.example");
  });
  it("rejects temporary Vercel preview origins", () => {
    expect(() => resolveSiteOrigin("https://temporary-preview.vercel.app")).toThrow();
  });
  it("includes only the existing public homepage and no generated lastmod", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const paths = sitemapStaticPaths(router);
    expect(paths).toEqual(["/"]);
    const xml = sitemapXML("https://dr-ramon-advogado.lovable.app", paths.map((path) => ({ path })));
    expect(xml).toContain("<loc>https://dr-ramon-advogado.lovable.app/</loc>");
    expect(xml).not.toContain("lastmod");
  });
  it("uses the existing office contact information", () => {
    expect(legalService.telephone).toBe("+5573988662627");
    expect(legalService.address.addressLocality).toBe("Porto Seguro");
    expect(legalService.address.postalCode).toBe("45810-000");
  });
});
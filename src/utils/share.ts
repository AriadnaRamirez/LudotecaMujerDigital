export interface ShareResult {
  method: "web-share" | "clipboard" | "none";
  success: boolean;
}

/** Absolute URL inside the app, respecting Vite/GitHub Pages base path. */
export function absoluteAppUrl(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return new URL(normalized, window.location.origin + import.meta.env.BASE_URL)
    .href;
}


export async function shareResource(data: {
  title: string;
  text?: string;
  url: string;
}): Promise<ShareResult> {
  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share(data);
      return { method: "web-share", success: true };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { method: "web-share", success: false };
      }
      // Si falla el Web Share API, se intenta copiar al portapapeles.
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(data.url);
      return { method: "clipboard", success: true };
    } catch {
      return { method: "clipboard", success: false };
    }
  }

  return { method: "none", success: false };
}

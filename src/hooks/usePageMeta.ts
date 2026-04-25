import { useEffect } from 'react';

/**
 * Sets document.title and meta description for the current page.
 * Lightweight alternative to react-helmet for SPA.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const suffix = ' — CannaWorld Gateway';
    document.title = title.endsWith(suffix) ? title : `${title}${suffix}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    return () => {
      // Reset on unmount so other pages can set their own
    };
  }, [title, description]);
}

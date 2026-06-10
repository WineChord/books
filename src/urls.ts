export function pageUrl(base: string, path: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  if (!path || path.endsWith("/")) {
    return `${normalizedBase}${path}`;
  }
  return `${normalizedBase}${path}.html`;
}

export function assetUrl(base: string, path: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path}`;
}

export function canonicalPath(path: string): string {
  if (!path || path.endsWith("/")) {
    return path;
  }
  return `${path}.html`;
}

import type { Resource } from "../types";

export type ContributionIssue =
  | "contributor"
  | "discovery"
  | "impact"
  | "recommendation"
  | "link";

export interface ContributionAudit {
  total: number;
  ready: number;
  pending: number;
  missingContributor: number;
  missingAnswers: number;
  invalidLinks: number;
  duplicateContributors: string[];
}

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export function hasDirectLink(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      url.hostname !== "example.com" &&
      !url.hostname.endsWith(".example.com")
    );
  } catch {
    return false;
  }
}

export function getContributionIssues(resource: Resource): ContributionIssue[] {
  const issues: ContributionIssue[] = [];

  if (!hasText(resource.contributorName)) issues.push("contributor");
  if (!hasText(resource.discoveryContext)) issues.push("discovery");
  if (!hasText(resource.impactReflection)) issues.push("impact");
  if (!hasText(resource.recommendationReason)) issues.push("recommendation");
  if (!hasDirectLink(resource.url)) issues.push("link");

  return issues;
}

export function isContributionReady(resource: Resource): boolean {
  return getContributionIssues(resource).length === 0;
}

export function auditContributions(resources: Resource[]): ContributionAudit {
  const contributorCounts = new Map<string, { name: string; count: number }>();
  let missingContributor = 0;
  let missingAnswers = 0;
  let invalidLinks = 0;
  let ready = 0;

  resources.forEach((resource) => {
    const issues = getContributionIssues(resource);
    if (issues.length === 0) ready += 1;
    if (issues.includes("contributor")) missingContributor += 1;
    if (
      issues.includes("discovery") ||
      issues.includes("impact") ||
      issues.includes("recommendation")
    ) {
      missingAnswers += 1;
    }
    if (issues.includes("link")) invalidLinks += 1;

    const contributor = resource.contributorName?.trim();
    if (contributor) {
      const key = contributor
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const current = contributorCounts.get(key);
      contributorCounts.set(key, {
        name: contributor,
        count: (current?.count ?? 0) + 1,
      });
    }
  });

  return {
    total: resources.length,
    ready,
    pending: resources.length - ready,
    missingContributor,
    missingAnswers,
    invalidLinks,
    duplicateContributors: [...contributorCounts.values()]
      .filter(({ count }) => count > 1)
      .map(({ name }) => name),
  };
}

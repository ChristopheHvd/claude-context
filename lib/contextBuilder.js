export function buildContext({ habits, peakHours, totalVisits, name, role, days }) {
  return {
    summary: { name, role, days },
    habits,
    peakHours,
    totalVisits,
  };
}

export function truncateForPrompt(context) {
  return { ...context };
}

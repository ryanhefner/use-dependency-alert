export default useDependencyAlert;
/**
 * useDependencyAlert
 *
 * Hook for testing dependency arrays and alerts and reports when exceeds defined thresholds.
 *
 * @param {unknown[]=} dependencies
 * @param {{ context?: string, dependencyKeys?: string[], logDelay?: number }=} options
 * @returns unknown[]
 */
declare function useDependencyAlert(dependencies?: unknown[] | undefined, options?: {
    context?: string;
    dependencyKeys?: string[];
    logDelay?: number;
}): unknown[];

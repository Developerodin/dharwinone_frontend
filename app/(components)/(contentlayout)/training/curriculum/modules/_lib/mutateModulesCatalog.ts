import type { TrainingModule as ApiTrainingModule } from '@/shared/lib/api/training-modules'

/**
 * Merges a patch onto one module, keeping every other row’s object identity.
 */
export function patchModuleInList(
  catalog: ApiTrainingModule[],
  moduleId: string,
  patch: Partial<ApiTrainingModule>,
): ApiTrainingModule[] {
  return catalog.map((mod) => (mod.id === moduleId ? { ...mod, ...patch, id: mod.id } : mod))
}

/**
 * Replaces one module with the API payload (status, folders, etc.).
 */
export function replaceModuleInList(
  catalog: ApiTrainingModule[],
  moduleId: string,
  next: ApiTrainingModule,
): ApiTrainingModule[] {
  return catalog.map((mod) => (mod.id === moduleId ? { ...mod, ...next, id: mod.id } : mod))
}

/**
 * Applies the same patch to every id in `ids`.
 */
export function patchModulesInList(
  catalog: ApiTrainingModule[],
  ids: Set<string>,
  patch: Partial<ApiTrainingModule>,
): ApiTrainingModule[] {
  if (ids.size === 0) return catalog
  return catalog.map((mod) => (ids.has(mod.id) ? { ...mod, ...patch, id: mod.id } : mod))
}

/**
 * Drops one module after a successful delete.
 */
export function removeModuleFromList(
  catalog: ApiTrainingModule[],
  moduleId: string,
): ApiTrainingModule[] {
  return catalog.filter((mod) => mod.id !== moduleId)
}

/**
 * Drops every id in `ids` after a bulk delete.
 */
export function removeModulesFromList(
  catalog: ApiTrainingModule[],
  ids: Set<string>,
): ApiTrainingModule[] {
  if (ids.size === 0) return catalog
  return catalog.filter((mod) => !ids.has(mod.id))
}

/**
 * Collects ids whose `Promise.allSettled` slot fulfilled, in the same order as `ids`.
 */
export function fulfilledIds(ids: string[], results: PromiseSettledResult<unknown>[]): Set<string> {
  const ok = new Set<string>()
  ids.forEach((id, index) => {
    if (results[index]?.status === 'fulfilled') ok.add(id)
  })
  return ok
}

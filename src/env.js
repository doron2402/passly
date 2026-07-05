// Environment hygiene for spawned child processes.

/**
 * A copy of the current environment with the master-password variables removed.
 *
 * vaultly shells out to `git` and to clipboard helpers (`pbcopy`/`clip`/`xclip`).
 * `spawnSync` inherits `process.env` by default, which would expose
 * VAULTLY_PASSWORD / VAULTLY_NEW_PASSWORD to those children — readable via
 * `/proc/<pid>/environ` or exfiltratable by a compromised/shimmed helper.
 * Children never need these values, so we strip them. See SECURITY_AUDIT.md M-1.
 *
 * @returns {NodeJS.ProcessEnv} sanitized environment for child processes
 */
export function childEnv() {
  const env = { ...process.env };
  delete env.VAULTLY_PASSWORD;
  delete env.VAULTLY_NEW_PASSWORD;
  return env;
}

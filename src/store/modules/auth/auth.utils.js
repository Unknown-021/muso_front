export function reset(commit, modules) {
  modules.forEach(moduleName => {
    commit(`${moduleName}/reset`, {}, { root: true });
  });
}

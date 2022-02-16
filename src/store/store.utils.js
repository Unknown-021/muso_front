export function resetState(state) {
  return (currState) => {
    Object.assign(currState, state());
  }
}

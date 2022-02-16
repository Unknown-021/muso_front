import { throttle } from '../utils';

export function onWindowResize(handler, { throttling = 0 } = {}) {
  const eventHandler = throttle(handler, throttling);
  
  const on = () => window.addEventListener('resize', eventHandler);
  const off = () => window.removeEventListener('resize', eventHandler);

  on();

  return { on, off };
}

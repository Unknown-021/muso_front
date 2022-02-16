import { TouchDetector } from "services/touch-detector";
import { isServer } from "helpers/constants";

const detectors = new WeakMap();
const isTouchDevice = !isServer && 'ontouchstart' in window;

function setIgnoreSelectorsIfNeeded(detector, binding) {
  if (binding.value?.ignore) {
    detector.setIgnoreSelectors(binding.value.ignore);
  }
}

let touch = !isTouchDevice
  ? {}
  : {
    inserted(el, binding) {
      const touchDetector = new TouchDetector(el);
      setIgnoreSelectorsIfNeeded(touchDetector, binding);

      detectors.set(el, touchDetector);
    },
    update(el, binding) {
      const detector = detectors.get(el);
      setIgnoreSelectorsIfNeeded(detector, binding);
    },
    unbind(el) {
      const touchDetector = detectors.get(el);
      touchDetector.destroy();
      detectors.delete(el);
    }
  };

export { touch };

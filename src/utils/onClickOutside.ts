import { onBeforeUnmount, onMounted } from "vue";
import { type MaybeElementRef, unrefElement } from "./unrefElement";

export type OnClickOutsideHandler = (event: PointerEvent) => void;

export function onClickOutside(
  target: MaybeElementRef,
  handler: OnClickOutsideHandler,
) {
  const listener = (event: Event) => {
    const el = unrefElement(target);

    if (event.target == null) {
      return;
    }

    if (!el || el === event.target || event.composedPath().includes(el)) {
      return;
    }

    // clicked outside
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    handler(event as any);
  };

  onMounted(() => {
    window.addEventListener("click", listener, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
}

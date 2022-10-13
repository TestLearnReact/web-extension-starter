import { RefObject, useEffect, useRef } from "react";

// https://github.com/ElForastero/use-click-outside

type ListenerEvent = MouseEvent & {
  target: Element;
};

const useClickOutside = ({
  ref,
  callback,
  eventType = "click",
  ignoreClassNames,
}: {
  ref: RefObject<HTMLElement>;
  callback: (event: MouseEvent) => void;
  eventType?: "click" | "mousedown" | "mouseup"; //= "mousedown" //string = "click"
  ignoreClassNames?: string;
}) => {
  const handlerRef = useRef(callback);

  /**
   * Update callback if it changes
   */
  useEffect(() => {
    handlerRef.current = callback;
  });

  /**
   * Add and remove event listeners
   */

  useEffect(() => {
    const listener: any = (event: ListenerEvent) => {
      if (ref && ref.current) {
        if (
          ignoreClassNames &&
          (event.target.shadowRoot?.querySelectorAll(ignoreClassNames) ||
            event.target.classList.contains(ignoreClassNames))
        )
          return;

        if (event.target.shadowRoot) {
          if (!event.target.shadowRoot.contains(ref.current)) {
            handlerRef.current(event);
          }
        } else {
          if (!ref.current.contains(event.target)) {
            handlerRef.current(event);
          }
        }
      }
    };

    document.addEventListener(eventType, listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener(eventType, listener);
      document.removeEventListener("touchstart", listener);
    };
  });
};

export { useClickOutside };

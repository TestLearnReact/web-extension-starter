import { RefObject } from "react";
declare const useClickOutside: ({ ref, callback, eventType, ignoreClassNames, }: {
    ref: RefObject<HTMLElement>;
    callback: (event: MouseEvent) => void;
    eventType?: "click" | "mousedown" | "mouseup" | undefined;
    ignoreClassNames?: string | undefined;
}) => void;
export { useClickOutside };

export declare function createInPageUI(name: string, cssFile: string, containerClassNames?: string[]): {
    rootElement: HTMLDivElement;
    shadowRoot: ShadowRoot | null;
};
export declare function destroyInPageUI(name: string): void;
export declare function createInPageUIRoot({ containerId, rootId, cssFile, rootClassNames, containerClassNames, }: {
    containerId: string;
    rootId: string;
    cssFile: string;
    rootClassNames?: string[];
    containerClassNames?: string[];
}): {
    rootElement: HTMLDivElement;
    shadowRoot: ShadowRoot | null;
};
export declare function destroyRootElement(containerId: string): void;
export declare function createShadowRootIfSupported(container: HTMLElement, rootId: string, rootClassNames?: string[], cssFile?: string): {
    rootElement: HTMLDivElement;
    shadow: ShadowRoot | null;
};
/**
 * Injects a CSS stylesheet into the webpage.
 * @param {string} cssUrl URL of the stylesheet to inject
 */
export declare function injectCSS(cssUrl: string, root?: ShadowRoot | Element): Promise<unknown> | undefined;
export declare function injectScript(src: string, options?: {
    parent?: Element;
    id?: string;
}): void;

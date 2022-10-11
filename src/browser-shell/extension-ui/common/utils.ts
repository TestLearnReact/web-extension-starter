export function createInPageUI(
  name: string,
  cssFile: string,
  containerClassNames?: string[]
) {
  const containerId = `memex-${name}-container`;
  // const mountDev = document.querySelector(`#${containerId}`);
  // if (mountDev) return { rootElement: mountDev, shadowRoot: mountDev };

  const mount = createInPageUIRoot({
    containerId, //: `memex-${name}-container`,
    rootId: `memex-${name}`,
    rootClassNames: [`memex-${name}`],
    containerClassNames,
    cssFile,
  });

  // retargetEvents(mount.shadowRoot)

  return mount;
}

export function destroyInPageUI(name: string) {
  return destroyRootElement(`memex-${name}-container`);
}

export function createInPageUIRoot({
  containerId,
  rootId,
  cssFile,
  rootClassNames,
  containerClassNames,
}: {
  containerId: string;
  rootId: string;
  cssFile: string;
  rootClassNames?: string[];
  containerClassNames?: string[];
}) {
  const container = document.createElement("div");
  container.setAttribute("id", containerId);

  if (containerClassNames != null) {
    container.classList.add(...containerClassNames);
  }

  const { rootElement, shadow } = createShadowRootIfSupported(
    container,
    rootId,
    rootClassNames,
    cssFile
  );
  // todo besser schneller machen
  const mountDev = document.querySelector(`#${containerId}`);
  // if (mountDev) return { rootElement, shadowRoot: shadow };

  if (!mountDev) {
    document.body.appendChild(container);
  }

  return { rootElement, shadowRoot: shadow };
}

export function destroyRootElement(containerId: string) {
  const container = document.querySelector(`#${containerId}`);
  if (container) {
    container.remove();
  }
}

export function createShadowRootIfSupported(
  container: HTMLElement,
  rootId: string,
  rootClassNames?: string[],
  cssFile: string = ""
) {
  const rootElement = document.createElement("div");
  rootElement.setAttribute("id", rootId);

  if (rootClassNames != null) {
    rootElement.classList.add(...rootClassNames);
  }

  let shadow: ShadowRoot | null = null; // todo
  if (!true && container.attachShadow) {
    //isCsDevHtmlchrome()
    //!isViteAndDev &&
    // todo dev style tag head  no shadow
    // container.attachShadow
    /** 'open' mode to access shadow dom elements from outisde the shadow root.
     * More info: https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#Parameters
     */
    shadow = container.attachShadow({ mode: "open" });

    let innerHTML = "";
    innerHTML += "<style>";
    innerHTML += ":host {all: initial}";
    innerHTML += "</style>";
    shadow.innerHTML = innerHTML;

    shadow.appendChild(rootElement);
    injectCSS(cssFile, shadow);
  } else {
    container.appendChild(rootElement);
    injectCSS(cssFile);
  }

  return { rootElement, shadow };
}

/**
 * Injects a CSS stylesheet into the webpage.
 * @param {string} cssUrl URL of the stylesheet to inject
 */
export function injectCSS(cssUrl: string, root?: ShadowRoot | Element) {
  //Element =
  // Check if the css file is already present in the webpage
  const node = (root || document).querySelector(`link[href="${cssUrl}"]`);
  if (node) {
    return;
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.onload = resolve;
    link.onerror = reject;
    link.href = cssUrl;
    const d =
      root || document.body || document.head || document.documentElement;
    d.prepend(link);
  });
}

export function injectScript(
  src: string,
  options?: { parent?: Element; id?: string }
) {
  const script = document.createElement("script");
  script.src = src;
  if (options?.id) {
    script.id = options.id;
  }
  (options?.parent || document.body).appendChild(script);
}

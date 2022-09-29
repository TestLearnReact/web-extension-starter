import React from "react";

const useWithViewbox = (ref) => {
  React.useLayoutEffect(() => {
    if (
      ref.current !== null &&
      // only if there is no viewBox attribute
      !ref.current.getAttribute("viewBox") &&
      // only if not test (JSDOM)
      // https://github.com/jsdom/jsdom/issues/1423
      ref.current.getBBox &&
      // only if rendered
      // https://stackoverflow.com/questions/45184101/error-ns-error-failure-in-firefox-while-use-getbbox
      ref.current.getBBox().width &&
      ref.current.getBBox().height
    ) {
      const box = ref.current.getBBox();

      ref.current.setAttribute(
        "viewBox",
        [box.x, box.y, box.width, box.height].join(" ")
      );
    }
  });
};

export default useWithViewbox;

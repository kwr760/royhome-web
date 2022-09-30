const removeJssStyle = (element: Element | null): void => {
  if (element) {
    element.parentNode?.removeChild(element);
  }
};

export { removeJssStyle };

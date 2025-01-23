export const setUpDomObserver = (
  callback: () => void,
  selector: string = "body"
) => {
  const targetElement = document.querySelector(selector);
  if (!targetElement) {
    throw new Error(`${selector} 요소를 찾을 수 없습니다.`);
  }

  const observer = new MutationObserver(() => callback());
  observer.observe(targetElement, { childList: true, subtree: true });

  return () => observer.disconnect();
};

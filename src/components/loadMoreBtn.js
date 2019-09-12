export const createLoadMoreBtn = () => {
  const btn = document.createElement(`button`);
  btn.classList.add(`load-more`);
  btn.type = `button`;
  btn.innerHTML= `Load More`;
  return btn;
}

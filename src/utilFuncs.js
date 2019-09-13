const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const render = (element, parent, place) => {
  if (place === `afterbegin`) {
    parent.prependChild(element);
  } else {
    parent.appendChild(element);
  }
};
/*
const removeElement = (element) => {
  if (element) {
    element.remove();
  }
};
*/
export {createElement, render};

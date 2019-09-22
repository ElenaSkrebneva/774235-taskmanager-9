const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const render = (element, parent, place) => {
  if (place === `afterbegin`) {
    parent.prepend(element);
  } else {
    parent.appendChild(element);
  }
};

export {createElement, render};

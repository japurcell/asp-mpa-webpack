import './index.scss';

const elements = document.querySelectorAll('.print-today');

elements.forEach(el => {
  const span = document.createElement('span');
  span.classList.add('print-today__header');
  const now = new Date();
  const dateNode = document.createTextNode(now.toString());
  span.appendChild(dateNode);
  el.appendChild(span);
});

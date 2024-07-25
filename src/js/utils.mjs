// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter() {
  const headerTemplate = loadTemplate("/partials/header.html"); 
  const footerTemplate = loadTemplate("/partials/footer.html");

  // Grab the header and footer elements from the DOM
  const headerElement = document.querySelector("#header");
  const footerElement = document.querySelector("#footer");

  // Render the header and footer templates
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
} 
  
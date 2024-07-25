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



// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

  
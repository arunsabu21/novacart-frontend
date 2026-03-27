export function setTitle(page) {
  if (!page) {
    document.title = "NovaCart";
  } else {
    document.title = `${page} | NovaCart`;
  }
}

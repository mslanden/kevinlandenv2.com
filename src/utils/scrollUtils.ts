export const smoothScrollTo = (element: HTMLElement, offset = 0) => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const scrollToSection = (id: string, offset = 80) => {
  const element = document.getElementById(id);
  if (element) {
    smoothScrollTo(element, offset);
  }
};

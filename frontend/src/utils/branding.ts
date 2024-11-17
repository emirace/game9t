export const setFavicon = (faviconUrl: string) => {
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (link) {
    link.href = faviconUrl;
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = faviconUrl;
    document.head.appendChild(newLink);
  }
};

export const setFontStyle = (fontFamily: string) => {
  document.documentElement.style.setProperty("--font-family", fontFamily);
};

export const setFontSize = (fontSize: string) => {
  document.documentElement.style.setProperty("--font-size", fontSize);
};

export const setThemeColor = (color: string) => {
  document.documentElement.style.setProperty("--primary-color", color);
};

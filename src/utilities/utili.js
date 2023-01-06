export const setItem = (itemname, item) => {
  localStorage.setItem(itemname, item);
};

export const getItem = (itemname) => {
  return localStorage.getItem(itemname);
};

export const removeItem = (itemname) => {
  localStorage.removeItem(itemname);
};

export const getFormattedDate = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB");
};

export const getImageFromList = (media, size) => {
  console.log("User requesting a " + size + " image");
  let image = "";
  console.log(media);
  // if (size == 'thumbnail'){

  // }
  // else if (size == 'very_small'){

  // }
  // else if (size == 'small'){

  // }
  // else if (size == 'medium_small'){

  // }
  // else if (size == 'medium'){

  // }
  // else if (size == 'medium_large'){

  // }
  // else if (size == 'large'){

  // }
  // else if (size == 'very_large'){

  // }
  // else if (size == 'original'){

  // }

  for (let index in media) {
    let item = media[index];
    if (item.size === size) {
      image = item.link;
      console.log("Returning image: " + image);
    }
  }

  return image;
};

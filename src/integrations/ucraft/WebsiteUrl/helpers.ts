import { TopRank } from "./types";

export const urlCheck = (url: string) => {
  if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
    return url;
  } else {
    return `https://${url}`;
  }
};

export const getTopTemplateId = (topRank: TopRank) => {
  let topVal = 0;
  let topKey = "";
  Object.keys(topRank).forEach((key) => {
    if (topVal < topRank[key]) {
      topVal = topRank[key];
      topKey = key;
    }
  });

  return topKey;
};

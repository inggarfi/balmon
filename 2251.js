const URL_MAP = new Map([
  ["https://assetsqris.pages.dev/qris.jpg", "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg"]
]);

function rewriteImageURL(url) {
  return URL_MAP.get(url) ?? url; // kalau tidak ada di map, kembalikan apa adanya
}

// contoh pakai:
const oldUrl = "https://assetsqris.pages.dev/qris.jpg";
const newUrl = rewriteImageURL(oldUrl);
console.log(newUrl); 
// -> https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg

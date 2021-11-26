let idCounter = 0;

export const createElement = (arr, body) => {
  arr.push({
    id: idCounter++,
    name: body.name,
    alpha2Code: body.alpha2Code,
    alpha3Code: body.alpha3Code,
  });
};

export const seedElements = (arr) => {
  arr.push({
    id: idCounter++,
    name: "Bhutan",
    alpha2Code: "BT",
    alpha3Code: "BTN",
  });
  arr.push({
    id: idCounter++,
    name: "Afghanistan",
    alpha2Code: "AF",
    alpha3Code: "AFG",
  });
  arr.push({
    id: idCounter++,
    name: "Brazil",
    alpha2Code: "BR",
    alpha3Code: "BRA",
  });
  arr.push({
    id: idCounter++,
    name: "Mexico",
    alpha2Code: "MX",
    alpha3Code: "MEX",
  });
  arr.push({
    id: idCounter++,
    name: "Sri Lanka",
    alpha2Code: "LK",
    alpha3Code: "LKA",
  });
  arr.push({
    id: idCounter++,
    name: "Germany",
    alpha2Code: "DE",
    alpha3Code: "DEU",
  });
};

// module.exports = {
//   //   // getIndexById: getIndexById,
//   //   // getElementById: getElementById,
//   //   // updateElement: updateElement,
//   seedElements: seedElements,
//   createElement: createElement,
// };

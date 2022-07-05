// function for string verification
const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  else if (typeof value == "string") return true;
};

// function for link verification
const isValidLink = async function (link) {
  return /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i.test(
    link
  );
};

// function for name
const isValidName = function (name) {
  return /^[A-Za-z]+$/.test(name);
};

// function for input request
const isValidRequest = function (data) {
  if (Object.keys(data).length == 0) return false;
  return true;
};

// function for mail verification
const isValidMail = function (v) {
  return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(
    v
  );
};

// function for mobile verification
const isValidMobile = function (num) {
  return /^[6789]\d{9}$/.test(num);
};

// function for intern name verification
const isValidIntern = function (intern) {
  return /^[a-zA-Z ]{2,30}$/.test(intern);
};

module.exports = {
  isValid,
  isValidLink,
  isValidName,
  isValidRequest,
  isValidMail,
  isValidMobile,
  isValidIntern,
};

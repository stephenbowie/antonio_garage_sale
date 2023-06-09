/**
 *
 * utility class manipulating string
 *
 * @param {*} str
 * @returns func
 */
export const isEmptyOrUndefined = (str) => {
  if (
    typeof str == "undefined" ||
    !str ||
    str.length === 0 ||
    str === "" ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, "") === ""
  )
    return true;
  else return false;
};

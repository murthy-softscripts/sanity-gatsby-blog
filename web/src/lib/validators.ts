export const validateEmail = (email: string) => {
  const emailReg = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  return emailReg.test(email);
};
export const validateZip = (zip: string) => {
  const zipReg = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
  return zipReg.test(zip);
};

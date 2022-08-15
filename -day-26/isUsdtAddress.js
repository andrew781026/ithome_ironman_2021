// isUsdtAddress.js
'use strict';
// ref : https://www.npmjs.com/package/multicoin-address-validator
/**
 * Checks if the given string is an USDT address
 *
 * @method isUsdtAddress
 * @param {String} address the given HEX adress
 * @param {String} currency Optional. Currency name or symbol, e.g. 'erc20' , 'trc20' or 'sol'
 * @return {Boolean}
 */
export const isUsdtAddress = async (address, currency) => {
  // dynamic import multicoin-address-validator
  const WAValidator = await import('multicoin-address-validator');
  const validator = window.WAValidator
    ? window.WAValidator.validate
    : WAValidator.validate;

  if (currency === 'erc20') return validator(address, 'eth');
  else if (currency === 'trc20') return validator(address, 'trx');
  else if (currency === 'sol') return validator(address, 'sol');
  else return validator(address, currency);
};

// refs : https://www.geeksforgeeks.org/how-to-include-an-external-javascript-library-to-reactjs/
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

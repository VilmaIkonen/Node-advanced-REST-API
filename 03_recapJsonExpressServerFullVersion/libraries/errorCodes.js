'use strict';

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  DELETE_OK: 5,
  NOT_DELETED: 6
};

// return statement can be replaced w extra () around {} as below
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: 'Sorry! Error in the program.',
    code: CODES.PROGRAM_ERROR,
    type: 'error'
  }),
  NOT_FOUND: (key, value) => ({
    message: `No resource found with ${key} ${value}`,
    code: CODES.NOT_FOUND,
    type: 'error'
  }),
  DELETE_OK: (key, value) => ({
    message: `Resource with ${key} ${value} removed`,
    code: CODES.DELETE_OK,
    type: 'info'
  }),
  NOT_DELETED: (key, value) => ({
    message: `No resource found with ${key$} ${value}. Nothing removed`,
    code: CODES.NOT_DELETED,
    type: 'error'
  })
}

module.exports = { CODES, MESSAGES };

/* eslint-disable no-unused-vars */
export enum STATUS_CODE {
  /**
  @description Default Success
  **/
  S01 = 'SO1', //Default Success

  /**
  @description Default Error
  **/
  E01 = 'EO1', //Default Error

  /**
  @description User error
  **/
  E10 = 'E10', // User already exist
  E11 = 'E11', // User not exist
  E12 = 'E12', // Invalid document
  E13 = 'E13', // Invalid password
  E14 = 'E14', // User Not Authorized

  /**
  @description Course error
  **/
  E20 = 'E20', // User is not admin or a manager
  E21 = 'E21', // Course not exists
}

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
  E15 = 'E15', // User already active

  /**
  @description Course error
  **/
  E20 = 'E20', // User is not admin or a manager
  E21 = 'E21', // Course not exists
  E22 = 'E22', // User already in Course
  E23 = 'E23', // User not in Course

  /**
  @description Material error
  **/
  E24 = 'E24', // Material not exists
}

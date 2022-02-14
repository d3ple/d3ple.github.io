export enum ResponseStatusCode {
  NoError = 1,
  NoAllParametersPassed = 2,
  DataNotFound = 3,
  SQLOrPLError = 4,
  RottenTokenAuthorizeAgain = 5,
  RottenTokenRefreshRequired = 6,
  TokenNotExist = 7,
  IncorrectParams = 8,
  AuthorizeSessionExpired = 9,
  AuthorizeSessionGotBlocked = 10, // этот случай возможен при большом количестве запросов
  EGISError = -21, // ошибки ЕГИСА
}

export interface IRequestWithStatusCode<T> {
  code: ResponseStatusCode,
  message: string,
  response: T
}
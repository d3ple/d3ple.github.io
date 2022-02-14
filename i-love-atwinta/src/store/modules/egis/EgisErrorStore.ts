import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx'
import { egisErrorHandler } from '~/services/egis';
import RootStore from '~/store/modules/RootStore'
import { IRequestWithStatusCode } from '~/store/types/request';

export class EgisErrorAtom {
  constructor() {
    makeAutoObservable(this)
  }

  isError = false
  errorMessage = ''

  setIsError(errorState: boolean) {
    this.isError = errorState
  }

  setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage
  }

  reset() {
    this.isError = false
    this.errorMessage = ''
  }
}

/**
 * Note: В данном сторе хранится обработка ошибок EGIS
 */
class EgisError {
  rootStore!: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  // ---------------------------- Non-Breaking EGIS Errors ---------------------------- >>
  errorOnAssign = new EgisErrorAtom()

  resetNonBreakingErrorsToInitialState() {
    this.errorOnAssign = new EgisErrorAtom()
  }

  // ---------------------------- Global EGIS Error ---------------------------- >>
  redirectOnError: string | null = null
  egisErrorMessage = ''
  isEgisError = false
  isEgisErrorRelatedToAssign = false // Нужно для модалки на авторизации

  setIsEgisError(errorState: boolean) {
    this.isEgisError = errorState
  }
  
  setEgisErrorMessage(errorMessage: string) {
    this.egisErrorMessage = errorMessage
  }

  setIsEgisErrorRelatedToAssign(errorState: boolean) {
    this.isEgisErrorRelatedToAssign = errorState
  }

  setRedirectOnError(redirectData: string | null) {
    this.redirectOnError = redirectData
  }

  checkCallbackForEgisError<T, D>(
    payload: T,
    callback: (payload: T) => Promise<AxiosResponse<IRequestWithStatusCode<D>, T>>,
    onErrorRedirectTo: string | null = null // Note: тут может быть передана строка, на которую пользователь должен быть ридирекчен в случае ошибки от егиса
  ): Promise<IRequestWithStatusCode<D> | undefined> {
    return egisErrorHandler(payload, callback)
      .then((response) => {
        if (response) {
          if (response.isEgisError) {
            this.setEgisErrorMessage(response.data.message)
            this.setRedirectOnError(onErrorRedirectTo)
            this.setIsEgisError(true)
          }
          return response.data
        }
      })
  }
}

export default EgisError
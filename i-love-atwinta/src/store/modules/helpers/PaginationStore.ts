import { makeAutoObservable } from 'mobx'

/**
 * Note: Класс помощник для упрощения работы с пагинациями
 */
class Pagination {
  constructor() {
    makeAutoObservable(this)
  }

  // ---------------------------- Pagination ---------------------------- >>
  currentPage = 1
  itemsCount = 0
  itemsDisplayedOnPage = 1

  get amountOfPages() {
    return Math.ceil(this.itemsCount / this.itemsDisplayedOnPage)
  }

  get offset() {
    return this.currentPage * this.itemsDisplayedOnPage - this.itemsDisplayedOnPage
  }

  setCurrentPage(page: number) {
    this.currentPage = page
  }

  setItemsCount(count: number) {
    this.itemsCount = count
  }

  setItemsDisplayedOnPage(items: number) {
    this.itemsDisplayedOnPage = items
  }

  get noPagesOrSinglePage() {
    return this.amountOfPages === 0 || this.amountOfPages === 1
  }

  get canGoPreviousPage() {
    return this.currentPage !== 1
  }

  get canGoNextPage() {
    return this.currentPage < this.amountOfPages
  }

  goNextPage() {
    if (this.canGoNextPage) {
      this.currentPage += 1
    }
  }

  goPreviousPage() {
    if (this.canGoPreviousPage) {
      this.currentPage -= 1
    } 
  }
}

export default Pagination
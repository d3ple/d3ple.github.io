import { DateTime } from 'luxon'

// Перевод первой буквы строки к верхнему регистру
export function capitalize (value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// Форматирование даты
export function formatDate (date: string, mask = 'dd.MM.yyyy') {
  let formattedDate = capitalize(DateTime.fromSQL(date).setLocale('ru-RU').toFormat(mask))

  if (mask.indexOf('MMM') >= 0 && mask.indexOf('MMMM') < 0) {
    formattedDate = formattedDate.replace('.', '')
  }

  return formattedDate
}

/**
 * Серилизация данных для форм
 * @template T Тип приходящих данных
 * @template D Тип возвращаемых данных после серилизации
 * @param {T} formData Данный параметр даёт информацию о приходящем виде данных
 * @param {D} callback Данный параметр вернет вид данных, который мы получаем на выход после серелизации
 * @returns {D}
 */
// eslint-disable-next-line
export const serializeFormData = <T = any, D = T>(formData: T, callback: (data: T) => D): D => {
  return callback(formData)
}

// Подстановка правильного склонения в зависимости от количества
export function declension (n: number, t: string[]) {
  return t[(n %= 100, 20 > n && n > 4) ? 2 :[2,0,1,1,1,2][(n %= 10, n < 5) ? n : 5]]
}

export const goToExternalService = (route = '/help', target: '_blank'|'_self' = '_blank' ) => {
  window.open(`${process.env.EXTERNAL_WEB_SITE}${route}`, target);
}
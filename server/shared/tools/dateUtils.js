import moment from 'moment';

/**
 * Format mysql date to valid a Date. Refer to issue on getting date from mysql column (https://github.com/tgriesser/bookshelf/issues/246)
 * @param date
 */
export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD hh:mm:ss');
}

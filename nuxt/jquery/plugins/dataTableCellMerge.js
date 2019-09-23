import $ from 'jquery'

/**
 * @this {DOM Object} - DOM объект переданный на обработку
 */
export default function () {
  let elUpper

  let tables = $(this).find('table')

  for (let table of tables) {
    let tdReversed = $(table).find('td').get().reverse()

    // Удаление старого форматирования

    $(tdReversed).each((i, el) => {
      $(el).show()
      if ($(el).attr('rowspan')) {
        $(el).removeAttr('rowspan')
      }
    })

    // форматирование таблицы

    $(tdReversed).each((i, el) => {
      elUpper = $(el).parent().prev().children('td').eq($(el).index())
      if (($(el).index() === 0) && ($(el).text() === $(elUpper).text())) {
        $(el).hide()
        if ($(el).attr('rowspan')) {
          $(elUpper).attr('rowspan', Number($(el).attr('rowspan')) + 1)
          $(el).removeAttr('rowspan')
        } else {
          $(elUpper).attr('rowspan', 2)
        }
      }
    })
  }
}

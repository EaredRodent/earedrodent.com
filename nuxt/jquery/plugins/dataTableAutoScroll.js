import $ from 'jquery'

/**
 * @this {DOM Object} - DOM объект переданный на обработку
 */
export default function () {
  let contentBody = $(this).find('.content_body')
  if ($(contentBody).offset()) {
    let offsetTop = $(contentBody).offset().top
    if (offsetTop > 20) {
      $(contentBody).animate({ scrollTop: offsetTop }, 500)
    }
  }
}

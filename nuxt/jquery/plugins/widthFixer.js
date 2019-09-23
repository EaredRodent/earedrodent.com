import $ from 'jquery'

export default function () {
  let boxFooter = $(this).find('.box-footer')
  let boxContent = $(this).find('.box-content')
  boxContent.css('max-width', boxFooter.width())
}

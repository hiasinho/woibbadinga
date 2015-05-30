#= require 'jquery'
#= require_tree .

$(window).scroll ->
  $this = $(this)
  $cover = $('.cover')
  if $this.scrollTop() < $cover.height()
    $cover.find('h1').css
      'margin-top': ($this.scrollTop()/2)+"px"
      opacity: 1 - ($this.scrollTop()/1000)

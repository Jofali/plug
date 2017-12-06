+function ($) {

  $.fn.accordion = function (el) {
    var index;

    if(el === undefined) {
      el = '.san-accordion-content'
    }

    this.bind('click', function () {
      if($(this).index() === index) {
        $(el).eq(index).slideToggle()
        return
      }
        $(el).eq(index).slideUp()
        index = $(this).index()
        $(el).eq(index).slideDown()
    })

    this.find(el).bind('click', function(e) {
      e.stopPropagation()
    })

    return this

  }

}(jQuery)

$(function(){

  $.ajax({
    url: 'https://www.vue-js.com/api/v1/topics',
    type: 'get',
    async: true,
    beforeSend: function () {
      console.log('加载中')
    },
    success: function (data) {
      render(data.data)
    },
    error: function (data) {
      alert(data)
    },
    complete:function () {
      $('.san-accordion-list').accordion()
    }
  })
  function render (data) {
    for(var i = 0;i < data.length;i++)
    {
      renderDom(data[i].title, data[i].content)
    }
  
  }
  function renderDom (rTitle, rContent) {
    $('.san-accordion').append('<div class="san-accordion-list">\
      <div class="san-accordion-title">'
        + rTitle +
      '</div>\
      <div class="san-accordion-content">'
          + rContent +
      '</div>\
    </div>')
  }
})

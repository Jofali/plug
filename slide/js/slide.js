function noviceSlider(personData) {
  // 默认数据
  var data = {
    sum: 0,  // 当前帧
    spaceTime: 1000, // 轮播间隔
    switch: 'default', // 切换方式
    isNavigation: true, // 是否启用前进后退按钮
    isStop: true, // 是否启用悬停
    isPagination: true, // 是否启用分页器
    width: '100%', // 控制轮播图宽度
    stylePagination: 1 // 默认是数字，0 -> 无
  }

  var timer = null;
  if (personData) {
    for (var x in personData) {
        data[x] = personData[x]
    }
  }

  // 焦点控制播放
  function stopPlay() {
    $().onmouseover = function () {
      clearInterval(timer)
      $('.navigation')[0].style.display = "block"
    }
    $().onmouseout = function () {
      timer = setInterval(function () {
        slideTime()
      }, data.spaceTime)
      $('.navigation')[0].style.display = "none"
    }
  }

  // 图片切换
  function slideTime() {
    if (data.sum < ($('.slide-list').length - 1)) {
      data.sum += 1
    } else {
      data.sum = 0
    }
    setClass(data.sum)
  }

  // 创建控制器
  function createEl(el, content) {
    if (!Array.isArray(content) || content === undefined) {
      for (var i = 0; i < $('.slide-list').length; i++) {
        var pagePoint = document.createElement('div');
        el[0].appendChild(pagePoint);
      }
    } else {
      for (var i = 0; i < content.length; i++) {
        var pagePoint = document.createElement('div');
        pagePoint.innerHTML = content[i];
        el[0].appendChild(pagePoint);
      }
    }
  }

  // 分页器控制播放
  function pagination() {
    if (data.stylePagination === 0) {
      createEl($('.pagination'));
    } else {
      var arr = [];
      for (var i = 0; i < $('.slide-list').length; i++) {
        arr.push(i + 1)
      }
      createEl($('.pagination'), arr);
    }
    for (var i = 0; i < $('.pagination div').length; i++) {
      $('.pagination div')[i].index = i;
      $('.pagination div')[i].onmouseover = function () {
        setClass(this.index)
      }
      $('.pagination div')[i].onmouseout = function () {
        data.sum = this.index
      }
    }
  }

  // 前进后退按钮
  function navigation() {
    createEl($('.navigation'), ['<img src="img/left.svg">', '<img src="img/right.svg">']);
    $('.navigation div')[0].onclick = function () {
      if (data.sum != 0) {
        data.sum -= 1
      } else {
        data.sum = ($('.slide-list').length - 1)
      }
      setClass(data.sum)
    }
    $('.navigation div')[1].onclick = function () {
      if (data.sum != ($('.slide-list').length - 1)) {
        data.sum += 1
      } else {
        data.sum = 0
      }
      setClass(data.sum)
    }
  }

  // 设置轮播样式
  function setStyle() {
    if (data.width === '100%') {
      for (var i = 0; i < $('.slide-list').length; i++) {
        editStyle('.slide-list', i)
      }
      editStyle('.navigation', 0, 0.95)
      editStyle('.slide-wrap', 0, $('.slide-list').length)
    } else {
      for (var i = 0; i < $('.slide-list').length; i++) {
        $('.slide-list')[i].style.width = data.width + 'px'
      }
      $('.slide')[0].style.width = data.width + 'px'
      $('.navigation')[0].style.width = data.width * 0.95 + 'px'
    }
    $().style.height = $('.slide-list')[data.sum].offsetHeight + 'px'
    $('.pagination')[0].style.top = $('.slide-list')[data.sum].offsetHeight * 0.9 + 'px'
  }

  function editStyle(el, i, value) {
    if (value) {
      $(el)[i].style.width = document.body.clientWidth * value + 'px'
    } else {
      $(el)[i].style.width = document.body.clientWidth + 'px'

    }
  }

  // 设置当前帧
  function setClass(elNum) {
    if (data.switch !== 'fade' && data.switch !== 'slide') {
      for (var i = 0; i < $('.slide-list').length; i++) {
        editClass(i, ['default', 0])
      }
      editClass(elNum, ['default active', 1])
    }

    if (data.switch === 'fade') {
      for (var i = 0; i < $('.slide-list').length; i++) {
        editClass(i, ['fade', 0])
      }
      editClass(elNum, ['fade active-fade', 1])
    }

    if (data.switch === 'slide') {
      $('.slide-wrap')[0].className = 'slide-wrap slide-slide'
      for (var i = 0; i < $('.slide-list').length; i++) {
        editClass(i, ['slide', 0])
      }
      editClass(elNum, ['slide active-slide', 1])
      if (data.width === "100%") {
        $('.slide-wrap')[0].style.right = document.body.clientWidth * elNum + 'px'
      } else {
        $('.slide-wrap')[0].style.width = data.width * $('.slide-list').length + 'px'
        $('.slide-wrap')[0].style.right = data.width * elNum + 'px'
      }
    }
  }

  function editClass(pos, elClass) {
    var pagi = 'null'
    if (elClass[1] === 0) {
      pagi = 'default'
    } else {
      pagi = 'active'
    }
    $('.slide-list')[pos].className = 'slide-list slide-list-' + elClass[0]
    $('.pagination div')[pos].className = pagi
  }

  // dom选择器
  function $(el) {
    if (el) {
      return document.querySelectorAll('.novice-slider ' + el)
    } else {
      return document.querySelectorAll('.novice-slider')[0]
    }

  }

  // 主函数
  (function _main() {
    if (data.isPagination) {
      pagination();
    }

    if (data.isNavigation) {
      navigation();
    }

    setClass(data.sum);
    timer = setInterval(function () {
      slideTime()
    }, data.spaceTime);

    if (data.isStop) {
      stopPlay();
    }
    this.onload = function () {
      setStyle()
    }
  })()
}
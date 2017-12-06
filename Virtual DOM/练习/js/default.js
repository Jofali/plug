function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName)

  for (propName in this.props) {
    el.setAttribute(propName, this.props[propName])
  }

  var children = this.children || []

  children.forEach(function (child) {
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el
}

function el(tagName, props, children) {
  return new Element(tagName, props, children)
}

$(function () {
  $.ajax({
    url: 'default.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      var container = []
      for (var i = 0; i < data.data.length; i++) {
        container.push(
          el('li',{class: 'item'},[
            el('div', { class: 'view' }, [data.data[i].MeasureUnitName]),
            el('div', { class: 'view' }, [data.data[i].MeasureUnitEquipId]),
            el('div', { class: 'view' }, [data.data[i].MeasureUnitPointCode]),
            el('div', { class: 'view' }, [data.data[i].Name]),
            el('div', { class: 'view' }, [data.data[i].LocName]),
            el('div', { class: 'view' }, [data.data[i].ETCode]),
            el('div', { class: 'view' }, [data.data[i].EquipTypeName]),
            el('div', { class: 'view' }, [data.data[i].PointId]),
            el('div', { class: 'view' }, [data.data[i].RealTime]),
            el('div', { class: 'view' }, [data.data[i].Value]),
            el('div', { class: 'view' }, [data.data[i].ValueState]),
            el('div', { class: 'view' }, [data.data[i].ValueStateName]),
            el('div', { class: 'view' }, [data.data[i].EquipState]),
            el('div', { class: 'view' }, [data.data[i].FeedState]),
            el('div', { class: 'view' }, [data.data[i].DisplayColor])
  
          ])
        )
      }
      var i = 0
      var dom = el('ul', { class: 'list' }, container)
      var domEl = dom.render()
      $('.main').append(domEl)
    }
  })
})
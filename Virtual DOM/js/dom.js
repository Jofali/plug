/////////////////////////////////
//////  用JS对象模拟DOM树  ///////
/////////////////////////////////
function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName)

  for(propName in this.props) {
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

el = function (tagName, props, children) {
  return new Element(tagName, props, children)
}

//////////////////////////////////////
//////  比较两棵虚拟DOM树的差异  ///////
//////////////////////////////////////
// diff函数，比较两棵树
function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  diffWalk(oldTree, newTree, index, patches)
  return patches
}

function diffWalk (oldNode, newNode, index, patches) {
  
}

window.onload = function () {
  ul = el("ul",{id:"list"},[
    el('li',{class:'item'},['item1']),
    el('li',{class:'item'},['item2']),
    el('li',{class:'item'},['item3'])
  ])
  
  var ulRoot = ul.render()

  document.querySelector("#app").appendChild(ulRoot)
}

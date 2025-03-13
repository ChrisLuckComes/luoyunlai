import{j as e,d as t}from"./index-3e783dff.js";import{U as r}from"./useMarkdown-7c2fc3fe.js";const s='```html\n<li v-for="todo in todos" v-if="!todo.isComplete">\n  {{ todo }}\n</li>\n```',n=`\`\`\`js
function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}
\`\`\``,i=`\`\`\`js
function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for="" + alias + " in " + exp + "">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}
\`\`\``;function f(){const l=e.jsx(r,{markdown:s}),a=e.jsx(r,{markdown:n}),o=e.jsx(r,{markdown:i});return e.jsx("article",{id:"rootArticle",className:t.article,children:e.jsxs("main",{className:t.content,children:[e.jsx("h2",{className:t.articleTitle,children:"为什么v-for和v-if不要一起使用"}),"例如模板如下代码：",l,"它不会按设想中工作，而是照常执行v-for，并且对每个li都执行了v-if。",e.jsx("br",{}),"原因很简单，代码一看便知，解析模板的源码如下：",e.jsx("div",{className:t.assist,children:"packages\\vue-template-compiler\\browser.js"}),a,e.jsx("br",{}),"可见源码的判断顺序就是",e.jsx("code",{children:"el.for"}),"先于",e.jsx("code",{children:"el.if"}),e.jsx("br",{}),e.jsx("br",{}),o,"所以如果混用，就会在每个元素上都判断一次v-if，所以建议提前对数据进行过滤"]})})}export{f as default};

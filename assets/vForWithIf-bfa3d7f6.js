import{j as e,d as t}from"./index-829bfc52.js";import{U as r}from"./useMarkdown-aabb00ed.js";const o='```html\n<li v-for="todo in todos" v-if="!todo.isComplete">\n  {{ todo }}\n</li>\n```',n=`\`\`\`js
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
\`\`\``;function d(){const l=e.jsx(r,{markdown:o}),a=e.jsx(r,{markdown:n}),s=e.jsx(r,{markdown:i});return e.jsx("article",{id:"rootArticle",className:t.article,children:e.jsxs("main",{className:t.content,children:[e.jsx("h2",{className:t.articleTitle,children:"为什么 Vue 2 中 v-for 和 v-if 不建议一起使用"}),"例如模板如下代码：",l,"它不会按设想中工作，而是照常执行 v-for，并且对每个 li 都执行了 v-if。",e.jsx("br",{}),"原因很简单，在 Vue 2 中，`v-for` 的优先级高于 `v-if`，代码一看便知，解析模板的源码如下：",e.jsx("div",{className:t.assist,children:"packages\\\\vue-template-compiler\\\\browser.js 中的 `genElement` 函数"}),a,e.jsx("br",{}),"可见源码的判断顺序就是 `el.for` 先于 `el.if`",e.jsx("br",{}),e.jsx("br",{}),"查看 `genFor` 函数的实现：",s,"所以如果混用，就会在每个元素上都判断一次 `v-if`，带来不必要的性能开销。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("span",{className:"text-orange-500",children:"注意：在 Vue 3 中，`v-if` 的优先级高于 `v-for`。因此，如果在同一个元素上同时使用，`v-if` 会先执行，如果 `v-if` 的条件为假，`v-for` 根本不会执行。"}),e.jsx("br",{}),e.jsx("br",{}),"因此，在 Vue 2 中，最佳实践是使用计算属性预先过滤掉不需要显示的数据，这样既能清晰地分离逻辑，又能避免不必要的性能损耗。"]})})}export{d as default};

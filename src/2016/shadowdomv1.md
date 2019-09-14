<!--
title: What's New in Shadow DOM v1 (by examples)
date: 2016-06-22
toc: true
-->

This document is my attempt to track the difference between Shadow DOM v0 and
v1.

This is not a tutorial for Shadow DOM. Rather, this is my attempt to provide a
guide for those who are already familiar with Shadow DOM v0 and want to migrate
their components to v1. This guide should be considered work-in-progress. I will
make my best efforts to maintain this guide.

- Last update date: `<2016-10-05 Wed>`

# Creating a shadow root

## v0

Use `Element.createShadowRoot()`.

```javascript
let e = document.createElement('div');
let shadowRoot = e.createShadowRoot();
```

## v1

Use `Element.attachShadow({ mode: 'open' })` for an _open_ shadow root.

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
```

Use `Element.attachShadow({ mode: 'closed' })` for a _closed_ shadow root.

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'closed' });
```

<div class="article-danger">
A <code>mode</code> is mandatory in v1.
</div>

```javascript
let e = document.createElement('div');
// let shadowRoot = e.attachShadow(); // Throws an exception because `mode` is not given.
```

# Multiple Shadow Roots

## v0

Supported.

```javascript
let e = document.createElement('div');
let olderShadowRoot = e.createShadowRoot();
let youngerShadowRoot = e.createShadowRoot(); // It's okay. A shadow host can host more than one shadow roots.
```

<div class="article-danger">
Though multiple shadow roots were originally introduced to support an <em>Inheritance Model</em> for components,
Blink has already deprecated this feature even in v0. Do not use multiple shadow roots.
</div>

## v1

No longer supported.

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
// let another = e.attachShadow({ mode: 'open' });  // Error.
```

# A closed shadow root

## v0

A shadow root is always _open_.

## v1

_v1_ has a new kind of a shadow root, called _closed_.

The design goal of a _closed_ mode is to disallow any access to a node in a
closed shadow root from an outside world.

It is similar that a user's JavaScript can never access an _inside_ of a
`<video>` element in Google chrome. A `<video>` element is using a closed-mode
shadow root in its implementation in Blink.

Open:

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
console.assert(e.shadowRoot == shadowRoot); // It's okay. shadowHost.shadowRoot returns a shadow root if it is open.
```

Closed:

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'closed' });
console.assert(e.shadowRoot == null); // shadowHost.shadowRoot does not return the shadow root if it is closed.
```

The following APIs are subject to this kind of constraints:

- Element.shadowRoot
- Element.assignedSlot
- TextNode.assignedSlot
- Event.composedPath()

<div class="article-info">
To be precise, a concept of a <a href="https://dom.spec.whatwg.org/#concept-unclosed-node">unclosed node</a> is used to decide its <em>visibility</em> between two nodes.
A <a href="https://dom.spec.whatwg.org/#concept-unclosed-node">unclosed node</a> is a binary relation between two nodes.
</div>

<div class="article-danger">
Shadow DOM is not a security mechanism. Please do not use Shadow DOM if you want a security.
Nothing prevents <code>Element.prototype.attachShadow</code> from being hijacked.
</div>

[unclosed node]: https://dom.spec.whatwg.org/#concept-unclosed-node

# Elements which can be a shadow host

## v0

Every element can be a shadow host, _theoretically_.

```javascript
let shadowRoot1 = document.createElement('div').createShadowRoot();
let shadowRoot2 = document.createElement('input').createShadowRoot(); // Should be okay.
```

<div class=article-danger>
This is not real. We never successfully define proper semantics for every elements.
Thus, some of them do not work as intended. See this <a href="https://github.com/w3c/webcomponents/issues/511#issuecomment-223851226">comment</a> for the history.
Blink has already banned most of the supports.
</div>

## v1

A limited number of elements can be a shadow host.

```javascript
let shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
// document.createElement('input').attachShadow({ mode: 'open' });  // Error. `<input>` can not be a shadow host.
```

See the definition of the [attachShadow] for the complete list of such elements.
Custom elements can be a shadow host.

[attachshadow]: https://dom.spec.whatwg.org/#dom-element-attachshadow

# Insertion Points (v0) vs Slots (v1)

## v0

Use `<content select=query>` to select host's children. It can select host's
children by CSS query selector.

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" class="foo"></my-child>
  <my-child id="c2"></my-child>
  <my-child id="c3"></my-child>
</my-host>
```

<!-- prettier-ignore -->
```html
<!-- <my-host>'s shadow tree -->
<div>
  <content id="i1" select=".foo"></content>
  <content id="i2" select="my-child"></content> <content id="i3"></content>
</div>
```

The result is:

| Insertion point | Distributed nodes |
| --------------- | ----------------- |
| #i1             | #c1               |
| #i2             | #c2, #c3          |
| #i3             | Empty             |

The v0 also had `<shadow>` insertion points, however, let me skip the
explanation of `<shadow>` because multiple shadow roots are deprecated.

## v1

Use `<slot>` to select host's children. It selects host's children by _exact_
slot name matching.

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" slot="slot1"></my-child>
  <my-child id="c2" slot="slot2"></my-child>
  <my-child id="c3"></my-child>
</my-host>
```

<!-- prettier-ignore -->
```html
<!-- <my-host>'s shadow tree: -->
<div>
  <slot id="s1" name="slot1"></slot>
  <slot id="s2" name="slot2"></slot>
  <slot id="s3"></slot>
</div>
```

The result is:

| Slot                                     | Distributed nodes |
| ---------------------------------------- | ----------------- |
| #s1                                      | #c1               |
| #s2                                      | #c2               |
| #s3 (also known as the _"default slot"_) | #c3               |

# Re-distribution: Directly (v0) vs Indirectly by flattening (v1)

## v0

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" class="foo"></my-child>
  <my-child id="c2"></my-child>
  <my-child id="c3"></my-child>
</my-host>
```

<!-- prettier-ignore -->
```html
<!-- <my-host>'s shadow tree -->
<my-splatoon>
  <content id="i1" select=".foo"></content>
  <my-child id="c4" class="foo"></my-child>
  <content id="i2" select="my-child"></content>
  <content id="i3"></content>
</my-splatoon>
```

<!-- prettier-ignore -->
```html
<!-- <my-splatoon>'s shadow tree -->
<content id="i4" select="#c3"></content>
<content id="i5" select=".foo"></content>
<content id="i6"></content>
```

The result is:

| Insertion point | Distributed nodes |
| --------------- | ----------------- |
| #i1             | #c1               |
| #i2             | #c2, #c3          |
| #i3             | Empty             |

| Insertion point | Distributed nodes |
| --------------- | ----------------- |
| #i4             | #c3               |
| #i5             | #c1, #c4          |
| #i6             | #c2               |

## v1

```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" slot="slot1"></my-child>
  <my-child id="c2" slot="slot2"></my-child>
  <my-child id="c3"></my-child>
</my-host>
```

```html
<!-- <my-host>'s shadow tree -->
<my-splatoon>
  <slot id="s1" name="slot1" slot="slot4"></slot>
  <slot id="s2" name="slot2" slot="slot4"></slot>
  <my-child id="c4" slot="slot4"></my-child>
  <slot id="s3" slot="slot6"></slot>
</my-splatoon>
```

<!-- prettier-ignore -->
```html
<!-- <my-splatoon>'s shadow tree -->
<slot id="s4" name="slot4"></slot>
<slot id="s5" name="slot5"></slot>
<slot id="s6" name="slot6"></slot>
```

The result is:

| Slot | Distributed nodes |
| ---- | ----------------- |
| #s1  | #c1               |
| #s2  | #c2               |
| #s3  | #c3               |

| Slot | Distributed nodes |
| ---- | ----------------- |
| #s4  | #c1, #c2, #c4     |
| #s5  | empty             |
| #s6  | #c3               |

You can find another complex
[example](http://w3c.github.io/webcomponents/spec/shadow/#flattening-example) in
the Shadow DOM specification.

# Fallback contents

## v0

No supports.

<div class=article-info>
Blink has tried to support <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=380436">shadow as a function</a> as a similar feature.
That should have archived "a constructor call for a super class", however, we gave it up.
</div>

## v1

Child nodes of `<slot>` can be used as _fallback contents_. A good analogy of
this feature is "default value of function parameter" in a programming language.

The following example is borrowed from
[Blink's CL](https://codereview.chromium.org/1530643003)

<!-- prettier-ignore -->
```html
<!-- Top-level HTML -->
<div id="host">
  <div id="child1" slot="slot2"></div>
</div>
```

<!-- prettier-ignore -->
```html
<!-- #host's shadow tree -->
<slot name="slot1">
  <div id="fallback1"></div>
  <slot name="slot2">
    <div id="fallback2"></div>
  </slot>
</slot>
<slot name="slot3">
  <slot name="slot4">
    <div id="fallback3"></div>
  </slot>
</slot>
```

The result is

| Slot  | Assigned nodes | Distributed nodes   |
| ----- | -------------- | ------------------- |
| slot1 | empty          | #fallback1, #child1 |
| slot2 | #child1        | #child1             |
| slot3 | empty          | #fallback3          |
| slot4 | empty          | #fallback3          |

Thus, the flat tree will be:

<!-- prettier-ignore -->
```html
<div id="host">
  <div id="fallback1"></div>
  <div id="child1"></div>
  <div id="fallback3"></div>
</div>
```

# Events to react the change of distributions

## v0

No way.

## v1

A v1 has a new kind of events, called `slotchange`. If a slot's distributed
nodes changes as a result of DOM mutations, `slotchange` event will be fired at
the end of a microtask.

HTML:

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" slot="s1"></my-child>
</my-host>
```

```html
<!-- <my-host>'s shadow tree -->
<slot id="i1" name="s1"></slot>
```

JavaScript:

```javascript
slot_i1.addEventListener('slotchange', e => {
  console.log('fired');
});
const c2 = document.createElement('div');
my_host.appendChild(c2);
c2.setAttribute('slot', 's1');
// slotchange event will be fired on slot, '<slot id=i1 name=s1>', at the end of a micro task.
```

TODO(hayato): Explain this feature in-depth. For a while, see
[#issue 288](https://github.com/w3c/webcomponents/issues/288) for the context.

# Styling for distributed nodes

## v0

Use `::content selector` pseudo elements.

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" class="foo"></my-child>
  <my-child id="c2"></my-child>
  <my-child id="c3"></my-child>
</my-host>
```

<!-- prettier-ignore -->
```html
<!-- <my-host>'s shadow tree -->
<div>
  <content id="i1" select="my-child"></content>
</div>
<style>
  #i1::content .foo {
    color: red;
  }
</style>
```

`#c1` becomes red.

## v1

Use `::slotted (compound-selector)` pseudo elements.

<!-- prettier-ignore -->
```html
<!-- Top level HTML -->
<my-host>
  <my-child id="c1" slot="s1" class="foo"></my-child>
  <my-child id="c2" slot="s1"></my-child>
</my-host>
```

<!-- prettier-ignore -->
```html
<!-- <my-host>'s shadow tree: -->
<div>
  <slot id="i1" name="s1"></slot>
</div>
<style>
  #i1::slotted(.foo) {
    color: red;
  }
</style>
```

`#c1` becomes red.

<div class=article-info>
While <code>::content</code> can take any arbitrary selector, <code>::slotted</code> can only take a
<a href="https://drafts.csswg.org/selectors-4/#compound">compound selector</a> (in the parenthesis).
The reason of this restriction is to make a selector style-engine friendly, in terms of performance.

In v0, it is difficult to avoid a performance penalty caused by an arbitrary
selector which crosses shadow boundaries.

</div>

# Shadow piercing combinators

## v0

Use `/deep/` (zero-or-more shadow boundary crossing) and `::shadow` (one level
shadow boundary crossing).

<div class=article-danger>
These selectors were already deprecated in Blink. Do not use that.
</div>

## v1

No alternative.

# CSS Cascading order

## v0

The spec has a bug and the implementation in Blink is broken. It's too late to
fix it without breaking the Web.

## v1

Clarified. In short: "A rule in an outer tree wins a rule in an inner tree".

<div class=article-info>
Because <code>/deep/</code> and <code>::shadow</code> are unavailable in v1, only <code>::slotted</code> is affected by the new rule, as of now.
</div>

See
[this document](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Shadow-DOM-Cascade-Order-in-v1.md)
for the example.

# Sequential Focus Navigation

## v0

A document tree and a shadow tree are forming a _scope_ of sequential focus
navigation.

## v1

In addition to v0, `<slot>` becomes a _scope_ of sequential focus navigation.

See
[the comment](https://github.com/w3c/webcomponents/issues/375#issuecomment-178989178)
in the spec issue for an example.

TODO(hayato): Explain the concept behind the scene and its behavior here.

# DelegatesFocus

TODO(hayato): Explain this.

# ActiveElement

TODO(hayato): Explain the difference. For a while, see
[webcomponents #358](https://github.com/w3c/webcomponents/issues/358).

# Events across shadow boundaries

## v0

Events are propagating across shadow boundaries by default, except for a limited
kinds of events. See the
[list](http://w3c.github.io/webcomponents/spec/shadow/#scoped-flag).

## v1

Events are scoped in a tree by default, except for some of UA UIEvents.

For user-made synthetic events, you can control the behavior by a `composed`
flag.

HTML:

```html
<!-- Top level HTML -->
<my-host></my-host>
```

```html
<!-- <my-host>'s shadow tree -->
<div id=d1></div>
</style>
```

JavaScript:

```javascript
my_host.addEventListener('my-click1', e => {
  console.log('my-click1 is fired'); // This will not be called.
});
my_host.addEventListener('my-click2', e => {
  console.log('my-click2 is fired'); // This will be called.
});

d1.dispatchEvent(new Event('my-click1', { bubbles: true }));
d1.dispatchEvent(new Event('my-click2', { bubbles: true, composed: true }));
```

At `#my-host`, only an event listener for `my-click2` is called.

# Getting Event path

## v0

Use `Event.path`, which is a _property_.

## v1

Use `Event.composedPath()`, which is a _function_.

<div class=article-info>
There is a small difference between them.
After an event dispatching is done, <code>Event.composedPath()</code> returns an empty array, while <code>Event.path</code> does not.
</div>

# Functions which are renamed

| V0                                        | V1                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `insertionPoint.getDistributedNodes()`    | `slot.assignedNodes({flatten: true})`                                                                   |
| No equivalence                            | `slot.assignedNodes()`                                                                                  |
| `Element.getDestinationInsertionPoints()` | `Element.assignedSlot` (The meaning is slightly different. It returns only the directly assigned slot.) |

# New utility functions in Node

These functions are just utility functions. Thus, v0 or v1 does not matter.

- [Node.isConnected](https://dom.spec.whatwg.org/#dom-node-isconnected)

  Returns true if the node is
  [connected](https://dom.spec.whatwg.org/#dom-node-isconnected). _connected_ is
  relativey a new concept in the DOM Standard. Roughly speaking, it extends the
  meaning of _in a document_ for the era of Shadow DOM.

- [Node.getRootNode(options)](https://dom.spec.whatwg.org/#dom-node-getrootnode)

  Returns its root, or its
  [shadow-including root](https://dom.spec.whatwg.org/#concept-shadow-including-root)
  (aka _super-root_) if options's composed is true.

# Questions?

If you find a typo, mistake or a question in this document, please file an issue
[here](https://github.com/hayatoito/hayatoito.github.io/issues).

If you have a question about the Web Standard itself, please see the followings:

- [DOM Standard]
- [HTML Standard]
- [CSS Scoping]
- [Shadow DOM]

<div class=article-info>
We have been upstream-ing Shadow DOM specification into the DOM Standard, the HTML Standard, or the CSS Scoping.
The content of the Shadow DOM specification might not reflect the latest status.
See <a href="https://github.com/w3c/webcomponents/issues/377">webcomponents #377</a> for details.
</div>

[dom standard]: https://dom.spec.whatwg.org/
[html standard]: https://html.spec.whatwg.org/
[css scoping]: https://drafts.csswg.org/css-scoping/
[shadow dom]: http://w3c.github.io/webcomponents/spec/shadow/

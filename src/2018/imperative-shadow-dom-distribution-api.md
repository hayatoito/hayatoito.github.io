# Imperative Shadow DOM Distribution API

<!--
date: 2018-03-08
-->

The straw-man proposal for Imperative Shadow DOM distribution API. The context
is:
[https://github.com/whatwg/html/issues/3534](https://github.com/whatwg/html/issues/3534)

[Update] This proposal was posted
[here](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Imperative-Shadow-DOM-Distribution-API.md).

# Declarative API and Imperative API should be exclusively used in each shadow tree

Mixing declarative API and imperative API would be troublesome and can be the
cause of confusions for web developers. We _can_ invent complex rules, however,
no one wants to remember complex rules. Also, supporting both in the same shadow
tree would make a browser engine complex, which I don't want.

Thus, we don't allow mixing declarative API and imperative API in the same
shadow tree. Web developers have to show their _opt-in_ to use imperative API
for each shadow tree.

A shadow root has an associated _slotting_. Web developers can set shadow root's
_slotting_ to _manual_ by specifying it in attachShadow:

```js
const sr = attachShadow({ mode: ..., (optional) slotting: 'manual' })
```

The _manual_ means "we support only imperative APIs for the shadow tree". The
default is "we support only declarative API for the shadow tree".

# Imperative Slotting API

In addition to [assigned nodes], which is already defined in DOM Standard, a
slot has an associated _manually-assigned-nodes_ (ordered list). Unless stated
otherwise, it is empty.

[assigned nodes]: https://dom.spec.whatwg.org/#slot-assigned-nodes

A slot gets new API, called _assign_ (tentative name).

Basically, `slot.assign(sequence<Node> nodes)` sets the slot's
_manually-assigned-nodes_ to _nodes_. See the later section for details.

_manually-assigned-nodes_ is an internal field. It is write-only. Users cannot
read the value directly.

# Changes to HTML Standard

## HTMLSlotElement

```
partial interface HTMLSlotElement {
  ...
  void assign(sequence<Node> nodes)
}
```

`slot.assign(sequence<Node> nodes)` runs the following steps:

1.  Set the slot's _manually-assigned-nodes_ to _nodes_.
2.  Run [assign slotables for a tree] with slot’s tree.

step 2 is required because we have to re-calculate [assigned nodes] of every
slots in the tree at this timing.

Note: The detail is explained later, however, it would be worth noting that
_manually-assigned-nodes_ is not used as [assigned nodes] as is. You can think
that `slot.assign(sequence<Node> nodes)` tell the engine _candidate nodes_ from
where [assigned nodes] are constructed.

[assign slotables for a tree]:
  https://dom.spec.whatwg.org/#assign-slotables-for-a-tree

# Changes to DOM Standard

## ShadowRootInit

```
ShadowRootInit {
   ...
   (optional) sloting: 'manual'|'auto' //  (if omitted, it is 'auto');
}
```

## 4.2.2.3. Finding slots and slotables

[To find a slot] need to be updated. Other steps don't need to be updated from
the standard's perspective, I think, thanks to well-factored each steps.

[To find a slot] for a given slotable _slotable_ and an optional open flag
(unset unless stated otherwise), run these steps:

1.  If slotable’s parent is null, then return null.

2.  Let shadow be slotable’s parent’s shadow root.

3.  If shadow is null, then return null.

4.  If the open flag is set and shadow’s mode is not "open", then return null.

5.  [New Step] If shadow's _slotting_ is _manual_, return the first slot in
    shadow’s tree whose _manually-assigned-nodes_ includes slotable, if any, and
    null otherwise.

6.  Otherwise, return the first slot in shadow’s tree whose name is slotable’s
    name, if any, and null otherwise. (<= No change)

Note: This change implies:

- _manually-assigned-nodes_ is used only when a slot is in a shadow tree whose
  _slotting_ is _manual_.
- _manually-assigned-nodes_ is not used when a slot is in a shadow tree whose
  _slotting_ is _auto_.

  Web developers can call `slot.assign(...)` for such a slot, however, it is a
  sort of _no-op_, at least until the slot is moved to another shadow tree with
  'manual', where _manually-assigned-nodes_ might have a meaning (but it is
  unlikely).

- If the same node is set to _manually-assigned-nodes_ of more than one slots,
  the first slot in tree-order takes that node. The slot's location in the tree
  matters, as declarative API does so.

[to find a slot]: https://dom.spec.whatwg.org/#find-a-slot

# Examples

## Example 1: How imperative slotting API works in slotting=manual.

``` text
host
├──/shadowroot (slotting=manual)
│   ├── slot1
│   └── slot2
├── A
└── B
```

``` javascript
// '==' means ArrayEquals.
assert(slot1.assignedNodes() == []);
assert(slot2.assignedNodes() == []);

slot2.assign([A]);

assert(slot2.assignedNodes() == [A]);

slot2.assign([B, A]); // The order doesn't matter.

assert(slot2.assignedNodes() == [A, B]);

slot1.assign(A);

assert(slot1.assignedNodes() == [A]);
assert(slot2.assignedNodes() == [B]);

slot1.assign([A, A, A, host]); // We don't throw an exepction here.

assert(slot1.assignedNodes() == [A]);
assert(slot2.assignedNodes() == [B]);

slot1.assign([]);

assert(slot1.assignedNodes() == []);
assert(slot2.assignedNodes() == [A, B]);

slot2.assign([]);

assert(slot1.assignedNodes() == []);
assert(slot2.assignedNodes() == []);
```

## Example 1: Imperative slotting API doesn't have any effect in a shadow root with slotting=auto.

```text
host
├──/shadowroot (slotting=auto) (default)
│   ├── slot1 name=slot1
│   └── slot2 name=slot2
├── A slot=slot1
└── B slot=slot2
```

```javascript
assert(slot1.assignedNodes() == [A]);
assert(slot2.assignedNodes() == [B]);

slot1.assign([A, B]); // This doesn't have any effect because this shadow tree's slotting is auto

assert(slot1.assignedNodes() == [A]);
assert(slot2.assignedNodes() == [B]);
```

# Open Questions

- Should we reset _manually-assigned-nodes_ at some timings? e.g. when a slot is
  connected / or disconnected.

  The current proposal never resets _manually-assigned-nodes_. This rule is easy
  to remember. That would cover the most use cases, I think.

- Using `sequence<Node>` would be a right choice in slot.assign, given that the
  order doesn't matter?

  If WebIDL has a better type, like `Set<Node>`, we should use it.

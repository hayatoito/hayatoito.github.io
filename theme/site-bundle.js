'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

jQuery(function ($) {
  var windowLocation = $(window.location).attr('href');

  // Mark the current navigation link as active
  $('.navbar .nav li a').filter(function (_, el) {
    return windowLocation.lastIndexOf($(el).attr('href')) === 0;
  }).parent('li').addClass('active');

  // Bootstrap'ify admonitions
  var alert2Adminitions = new Map();
  alert2Adminitions.set('info', ['hint', 'tip', 'note']);
  alert2Adminitions.set('warning', ['warning', 'important', 'attention']);
  alert2Adminitions.set('danger', ['caution', 'danger', 'error']);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = alert2Adminitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          alert = _step$value[0],
          adminitions = _step$value[1];

      var admonitions = adminitions.map(function (a) {
        return 'div.' + a;
      }).join(', ');
      $(admonitions).addClass('alert alert-' + alert);
    }

    // Make some inline titles stand out
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $('.admonition-title,.topic-title').wrapInner('<strong />');

  // Turn figures into panels
  $('.figure').addClass('panel panel-default').wrapInner('<div class="panel-body"/>');
  $('.figure .caption').each(function () {
    var caption = $(undefined);
    var panel = caption.parents('.panel');
    var footer = $('<div class="panel-footer"/>');
    footer.html(caption.html());
    footer.appendTo(panel);
    caption.remove();
  });

  // Bootstrap'ify ReST alignments
  $('.align-center').addClass('text-center');

  // Markdown footnote extention.
  $('.footnote > hr').after($('<div class="site-footnote-title">Footnotes:</div>'));

  // Bootstrap'ify Markdown's table
  $('table').addClass('table').addClass('table-striped');

  function adjustTocHeaders() {
    // Add self-link based on ids, which are generatedby by markdown's toc extension.
    $('h1[id], h2[id]').each(function (_, el) {
      var header = $(el);
      var anchor = header.find('a[name]');
      if (anchor.length === 0) {
        // <h1 id="_6">YY</h1>
        // =>
        // <h1 id="_6"><a class="self-link" href="#_6">YY</a></h1>

        var id = header.attr('id');
        var content = header.text();
        header.html('<a class="self-link" href="#' + id + '">' + content + '</a>');
        // console.log(`add anchor ${id} to: `, el);
      } else {
        // If the header already has <anchor name="xxx"></anchor>, use its name as header's id.
        // This should be done before bootstrap-toc.js

        // e.g.
        // markdown:

        // XXX <a name="kingsviking"></a>
        // ====

        // <h1 id="_5">XX<a name="kingsviking"></a></h1>
        // =>
        // <h1 id="kingsviking"><a class="self-link" href="#kingsviking">XX</a></h1>
        var name = anchor.attr('name');
        anchor.addClass('self-link');
        anchor.attr('href', '#' + name);
        anchor.removeAttr('name');
        anchor.text(header.text());

        header.attr('id', name);
        header.empty();
        header.append(anchor);
        // console.log(`set id ${id} to`, el);
      }
    });

    // Add |data-toc-skip| so that bootstrap-toc.js excludes this.
    // See https://github.com/afeld/bootstrap-toc/blob/gh-pages/bootstrap-toc.js
    $('header > h1.site-page-title').attr('data-toc-skip', '');
  }

  if ($('nav#toc').length === 1) {
    // toc is enabled
    adjustTocHeaders();
  }
});

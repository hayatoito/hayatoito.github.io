jQuery(($) => {
  const windowLocation = $(window.location).attr('href');

  // Mark the current navigation link as active
  $('.navbar .nav li a')
    .filter((_, el) => windowLocation.lastIndexOf($(el).attr('href')) === 0)
    .parent('li')
    .addClass('active');

  // Bootstrap'ify admonitions
  const alert2Adminitions = new Map();
  alert2Adminitions.set('info', ['hint', 'tip', 'note']);
  alert2Adminitions.set('warning', ['warning', 'important', 'attention']);
  alert2Adminitions.set('danger', ['caution', 'danger', 'error']);

  for (const [alert, adminitions] of alert2Adminitions) {
    const admonitions = adminitions.map(a => `div.${a}`).join(', ');
    $(admonitions).addClass(`alert alert-${alert}`);
  }

  // Make some inline titles stand out
  $('.admonition-title,.topic-title').wrapInner('<strong />');

  // Turn figures into panels
  $('.figure')
    .addClass('panel panel-default')
    .wrapInner('<div class="panel-body"/>');
  $('.figure .caption').each(() => {
    const caption = $(this);
    const panel = caption.parents('.panel');
    const footer = $('<div class="panel-footer"/>');
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
    $('h1[id], h2[id]').each((_, el) => {
      const header = $(el);
      const anchor = header.find('a[name]');
      if (anchor.length === 0) {
        // <h1 id="_6">YY</h1>
        // =>
        // <h1 id="_6"><a class="self-link" href="#_6">YY</a></h1>

        const id = header.attr('id');
        const content = header.text();
        header.html(`<a class="self-link" href="#${id}">${content}</a>`);
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
        const name = anchor.attr('name');
        anchor.addClass('self-link');
        anchor.attr('href', `#${name}`);
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

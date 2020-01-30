const clone = require('clone')

const remarkConfig = require('../config/remark')
const rebberConfig = require('../config/rebber')
remarkConfig.noTypography = true
remarkConfig._test = true
remarkConfig.ping.pingUsername = () => false

const zmarkdown = require('../server')

const renderString = (config = {remarkConfig, rebberConfig}) =>
  (input) =>
    zmarkdown(config, 'latex').renderString(input).then((vfile) =>
      vfile.toString().trim())

const renderFile = (config = {remarkConfig, rebberConfig}) =>
  (input) =>
    zmarkdown(config, 'latex').renderFile(input).then((vfile) =>
      vfile.toString().trim())

const remarkConfigOverride = (config) => {
  const newConfig = clone(remarkConfig)
  Object.assign(newConfig, config)
  return {
    remarkConfig: newConfig,
    rebberConfig: rebberConfig,
  }
}

describe('#heading-shift', () => {

  it(`shifts in range`, () => {
    const config = remarkConfigOverride({headingShifter: 1})
    return expect(renderString(config)('### should be h4')).resolves.toMatchSnapshot()
  })

  it(`shifts past range`, () => {
    const config = remarkConfigOverride({headingShifter: 10})
    return expect(renderString(config)('### should be h6')).resolves.toMatchSnapshot()
  })

  it(`shifts before range`, () => {
    const config = remarkConfigOverride({headingShifter: -10})
    return expect(renderString(config)('### should be h1')).resolves.toMatchSnapshot()
  })
})

describe('#basic', () => {
  const dir = `${__dirname}/fixtures/basic/`

  it(`properly renders amps-and-angle-encoding.txt`, () => {
    const filepath = `${dir}/amps-and-angle-encoding.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders angle-links-and-img.txt`, () => {
    const filepath = `${dir}/angle-links-and-img.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders auto-links.txt`, () => {
    const filepath = `${dir}/auto-links.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders backlash-escapes.txt`, () => {
    const filepath = `${dir}/backlash-escapes.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders blockquotes-with-code-blocks.txt`, () => {
    const filepath = `${dir}/blockquotes-with-code-blocks.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders codeblock-in-list.txt`, () => {
    const filepath = `${dir}/codeblock-in-list.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders hard-wrapped.txt`, () => {
    const filepath = `${dir}/hard-wrapped.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders horizontal-rules.txt`, () => {
    const filepath = `${dir}/horizontal-rules.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders inline-html-advanced.txt`, () => {
    const filepath = `${dir}/inline-html-advanced.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders inline-html-comments.txt`, () => {
    const filepath = `${dir}/inline-html-comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders inline-html-simple.txt`, () => {
    const filepath = `${dir}/inline-html-simple.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders links-inline.txt`, () => {
    const filepath = `${dir}/links-inline.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders links-reference.txt`, () => {
    const filepath = `${dir}/links-reference.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders literal-quotes.txt`, function () {
    const filepath = `${dir}/literal-quotes.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })


  it(`properly renders nested-blockquotes.txt`, () => {
    const filepath = `${dir}/nested-blockquotes.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders ordered-and-unordered-list.txt`, () => {
    const filepath = `${dir}/ordered-and-unordered-list.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders strong-and-em-together.txt`, () => {
    const filepath = `${dir}/strong-and-em-together.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders tabs.txt`, () => {
    const filepath = `${dir}/tabs.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders tidyness.txt`, () => {
    const filepath = `${dir}/tidyness.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })
})

describe('#extensions', () => {
  const dir = `${__dirname}/fixtures/extensions/`

  it(`properly renders fenced_code.txt`, () => {
    const filepath = `${dir}/fenced_code.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders github_flavored.txt`, () => {
    const filepath = `${dir}/github_flavored.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  describe('#extra', () => {
    const dir = `${__dirname}/fixtures/extensions/extra/`

    it(`properly renders abbr.txt`, () => {
      const filepath = `${dir}/abbr.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders extra_config.txt`, function () {
      const filepath = `${dir}/extra_config.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders footnote_many_footnotes.txt`, () => {
      const filepath = `${dir}/footnote_many_footnotes.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders footnote_placeholder.txt`, function () {
      const filepath = `${dir}/footnote_placeholder.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders footnote.txt`, () => {
      const filepath = `${dir}/footnote.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders named_markers.txt`, function () {
      const filepath = `${dir}/named_markers.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders tables.txt`, () => {
      const filepath = `${dir}/tables.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders tables-2.txt`, () => {
      const filepath = `${dir}/tables-2.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })
  })
})

describe('#misc', () => {
  const dir = `${__dirname}/fixtures/misc/`

  it(`properly renders adjacent-headers.txt`, () => {
    const filepath = `${dir}/adjacent-headers.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders amp-in-url.txt`, () => {
    const filepath = `${dir}/amp-in-url.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders ampersand.txt`, () => {
    const filepath = `${dir}/ampersand.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders arabic.txt`, () => {
    const filepath = `${dir}/arabic.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders autolinks_with_asterisks.txt`, function () {
    const filepath = `${dir}/autolinks_with_asterisks.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders backtick-escape.txt`, () => {
    const filepath = `${dir}/backtick-escape.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders blank_lines_in_codeblocks.txt`, () => {
    const filepath = `${dir}/blank_lines_in_codeblocks.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders blank-block-quote.txt`, () => {
    const filepath = `${dir}/blank-block-quote.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders block_html_attr.txt`, () => {
    const filepath = `${dir}/block_html_attr.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders block_html_simple.txt`, () => {
    const filepath = `${dir}/block_html_simple.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders block_html5.txt`, () => {
    const filepath = `${dir}/block_html5.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders blockquote-below-paragraph.txt`, () => {
    const filepath = `${dir}/blockquote-below-paragraph.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders blockquote-hr.txt`, function () {
    const filepath = `${dir}/blockquote-hr.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders blockquote.txt`, () => {
    const filepath = `${dir}/blockquote.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders bold_links.txt`, () => {
    const filepath = `${dir}/bold_links.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders br.txt`, () => {
    const filepath = `${dir}/br.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders bracket_re.txt`, () => {
    const filepath = `${dir}/bracket_re.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders brackets-in-img-title.txt`, function () {
    const filepath = `${dir}/brackets-in-img-title.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders code-first-line.txt`, () => {
    const filepath = `${dir}/code-first-line.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders comments.txt`, () => {
    const filepath = `${dir}/comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders CRLF_line_ends.txt`, () => {
    const filepath = `${dir}/CRLF_line_ends.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders div.txt`, () => {
    const filepath = `${dir}/div.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders em_strong.txt`, () => {
    const filepath = `${dir}/em_strong.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders em-around-links.txt`, () => {
    const filepath = `${dir}/em-around-links.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders email.txt`, () => {
    const filepath = `${dir}/email.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders escaped_chars_in_js.txt`, () => {
    const filepath = `${dir}/escaped_chars_in_js.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders h1.txt`, () => {
    const filepath = `${dir}/h1.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders hash.txt`, function () {
    const filepath = `${dir}/hash.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders header-in-lists.txt`, function () {
    const filepath = `${dir}/header-in-lists.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders headers.txt`, function () {
    const filepath = `${dir}/headers.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders hline.txt`, function () {
    const filepath = `${dir}/hline.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders html-comments.txt`, function () {
    const filepath = `${dir}/html-comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders html.txt`, function () {
    const filepath = `${dir}/html.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders image_in_links.txt`, () => {
    const filepath = `${dir}/image_in_links.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders image-2.txt`, () => {
    const filepath = `${dir}/image-2.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders image.txt`, () => {
    const filepath = `${dir}/image.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders ins-at-start-of-paragraph.txt`, () => {
    const filepath = `${dir}/ins-at-start-of-paragraph.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders inside_html.txt`, () => {
    const filepath = `${dir}/inside_html.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lazy-block-quote.txt`, () => {
    const filepath = `${dir}/lazy-block-quote.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders link-with-parenthesis.txt`, () => {
    const filepath = `${dir}/link-with-parenthesis.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists.txt`, () => {
    const filepath = `${dir}/lists.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists2.txt`, () => {
    const filepath = `${dir}/lists2.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists3.txt`, () => {
    const filepath = `${dir}/lists3.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists4.txt`, () => {
    const filepath = `${dir}/lists4.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists5.txt`, () => {
    const filepath = `${dir}/lists5.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders lists6.txt`, function () {
    const filepath = `${dir}/lists6.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders lists7.txt`, function () {
    const filepath = `${dir}/lists7.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders lists8.txt`, () => {
    const filepath = `${dir}/lists8.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders markup-inside-p.txt`, function () {
    const filepath = `${dir}/markup-inside-p.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders mismatched-tags.txt`, () => {
    const filepath = `${dir}/mismatched-tags.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders missing-link-def.txt`, function () {
    const filepath = `${dir}/missing-link-def.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders more_comments.txt`, function () {
    const filepath = `${dir}/more_comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders multi-line-tags.txt`, () => {
    const filepath = `${dir}/multi-line-tags.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders multi-paragraph-block-quote.txt`, () => {
    const filepath = `${dir}/multi-paragraph-block-quote.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders multi-test.txt`, function () {
    const filepath = `${dir}/multi-test.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders multiline-comments.txt`, function () {
    const filepath = `${dir}/multiline-comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders nested-lists.txt`, function () {
    const filepath = `${dir}/nested-lists.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders nested-patterns.txt`, () => {
    const filepath = `${dir}/nested-patterns.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders normalize.txt`, () => {
    const filepath = `${dir}/normalize.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders numeric-entity.txt`, () => {
    const filepath = `${dir}/numeric-entity.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders para-with-hr.txt`, () => {
    const filepath = `${dir}/para-with-hr.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders php.txt`, () => {
    const filepath = `${dir}/php.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders pre.txt`, function () {
    const filepath = `${dir}/pre.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders raw_whitespace.txt`, function () {
    const filepath = `${dir}/raw_whitespace.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders russian.txt`, () => {
    const filepath = `${dir}/russian.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders smart_em.txt`, () => {
    const filepath = `${dir}/smart_em.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders some-test.txt`, function () {
    const filepath = `${dir}/some-test.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders span.txt`, () => {
    const filepath = `${dir}/span.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders strong-with-underscores.txt`, () => {
    const filepath = `${dir}/strong-with-underscores.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders strongintags.txt`, function () {
    const filepath = `${dir}/strongintags.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders tabs-in-lists.txt`, function () {
    const filepath = `${dir}/tabs-in-lists.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders two-spaces.txt`, function () {
    const filepath = `${dir}/two-spaces.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders uche.txt`, function () {
    const filepath = `${dir}/uche.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders underscores.txt`, () => {
    const filepath = `${dir}/underscores.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders url_spaces.txt`, function () {
    const filepath = `${dir}/url_spaces.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

})

describe('#options', () => {
  const dir = `${__dirname}/fixtures/options/`

  it(`properly renders no-attributes.txt`, () => {
    const filepath = `${dir}/no-attributes.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })
})

describe('#php', () => {
  const dir = `${__dirname}/fixtures/php/`

  it(`properly renders Code Spans.txt`, () => {
    const filepath = `${dir}/Code Spans.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders Code block on second line.txt`, () => {
    const filepath = `${dir}/Code block on second line.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Email auto links.txt`, function () {
    const filepath = `${dir}/Email auto links.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders Horizontal Rules.txt`, () => {
    const filepath = `${dir}/Horizontal Rules.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Inline HTML (Simple).txt`, function () {
    const filepath = `${dir}/Inline HTML (Simple).txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders Inline HTML comments.txt`, () => {
    const filepath = `${dir}/Inline HTML comments.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Links, inline style.txt`, function () {
    const filepath = `${dir}/Links, inline style.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it(`properly renders MD5 Hashes.txt`, () => {
    const filepath = `${dir}/MD5 Hashes.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Nesting.txt`, function () {
    const filepath = `${dir}/Nesting.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Parens in URL.txt`, function () {
    const filepath = `${dir}/Parens in URL.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders Tight blocks.txt`, function () {
    const filepath = `${dir}/Tight blocks.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })
})

describe('#pl', () => {
  describe.skip('#Tests_2004', function () {
    const dir = `${__dirname}/fixtures/pl/Tests_2004/`

    it(`properly renders Amps and angle encoding.txt`, () => {
      const filepath = `${dir}/Amps and angle encoding.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Auto links.txt`, () => {
      const filepath = `${dir}/Auto links.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Backslash escapes.txt`, () => {
      const filepath = `${dir}/Backslash escapes.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Blockquotes with code blocks.txt`, () => {
      const filepath = `${dir}/Blockquotes with code blocks.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Hard-wrapped paragraphs with list-like lines.txt`, () => {
      const filepath = `${dir}/Hard-wrapped paragraphs with list-like lines.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Horizontal rules.txt`, () => {
      const filepath = `${dir}/Horizontal rules.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Inline HTML (Advanced).txt`, () => {
      const filepath = `${dir}/Inline HTML (Advanced).txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Inline HTML (Simple).txt`, () => {
      const filepath = `${dir}/Inline HTML (Simple).txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Inline HTML comments.txt`, () => {
      const filepath = `${dir}/Inline HTML comments.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Links, inline style.txt`, () => {
      const filepath = `${dir}/Links, inline style.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Links, reference style.txt`, () => {
      const filepath = `${dir}/Links, reference style.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Literal quotes in titles.txt`, () => {
      const filepath = `${dir}/Literal quotes in titles.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Nested blockquotes.txt`, () => {
      const filepath = `${dir}/Nested blockquotes.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Ordered and unordered lists.txt`, () => {
      const filepath = `${dir}/Ordered and unordered lists.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Strong and em together.txt`, () => {
      const filepath = `${dir}/Strong and em together.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Tabs.txt`, () => {
      const filepath = `${dir}/Tabs.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Tidyness.txt`, () => {
      const filepath = `${dir}/Tidyness.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Yuri-Attributes.txt`, () => {
      const filepath = `${dir}/Yuri-Attributes.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Yuri-Email.txt`, () => {
      const filepath = `${dir}/Yuri-Email.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Yuri-Links-in-Headers.txt`, () => {
      const filepath = `${dir}/Yuri-Links-in-Headers.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })
  })

  describe('#Tests_2007', () => {
    const dir = `${__dirname}/fixtures/pl/Tests_2007/`

    it(`properly renders Amps and angle encoding.txt`, () => {
      const filepath = `${dir}/Amps and angle encoding.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Auto links.txt`, () => {
      const filepath = `${dir}/Auto links.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Blockquotes with code blocks.txt`, () => {
      const filepath = `${dir}/Blockquotes with code blocks.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders Hard-wrapped paragraphs with list-like lines.txt`, function () {
      const filepath = `${dir}/Hard-wrapped paragraphs with list-like lines.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Horizontal rules.txt`, () => {
      const filepath = `${dir}/Horizontal rules.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders Inline HTML (Advanced).txt`, function () {
      const filepath = `${dir}/Inline HTML (Advanced).txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders Inline HTML (Simple).txt`, function () {
      const filepath = `${dir}/Inline HTML (Simple).txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Inline HTML comments.txt`, () => {
      const filepath = `${dir}/Inline HTML comments.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders Links, inline style.txt`, function () {
      const filepath = `${dir}/Links, inline style.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Links, shortcut references.txt`, () => {
      const filepath = `${dir}/Links, shortcut references.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders Literal quotes in titles.txt`, function () {
      const filepath = `${dir}/Literal quotes in titles.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Nested blockquotes.txt`, () => {
      const filepath = `${dir}/Nested blockquotes.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Ordered and unordered lists.txt`, () => {
      const filepath = `${dir}/Ordered and unordered lists.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Strong and em together.txt`, () => {
      const filepath = `${dir}/Strong and em together.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Tabs.txt`, () => {
      const filepath = `${dir}/Tabs.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders Tidyness.txt`, () => {
      const filepath = `${dir}/Tidyness.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })
  })
})

describe('#zds', () => {
  const dir = `${__dirname}/fixtures/zds/`

  it.skip(`properly renders rediger_sur_zds_part1.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part1.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part2.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part2.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part3.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part3.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part4.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part4.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part5.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part5.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part6.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part6.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part7.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part7.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part8.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part8.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part9.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part9.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  it.skip(`properly renders rediger_sur_zds_part10.txt`, function () {
    const filepath = `${dir}/rediger_sur_zds_part10.txt`
    return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
  })

  describe('#extensions', () => {
    const dir = `${__dirname}/fixtures/zds/extensions/`

    it(`properly renders align.txt`, () => {
      const filepath = `${dir}/align.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it.skip(`properly renders comments_config.txt`, function () {
      const filepath = `${dir}/comments_config.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders comments.txt`, () => {
      const filepath = `${dir}/comments.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders customblock.txt`, () => {
      const filepath = `${dir}/customblock.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders delext.txt`, () => {
      const filepath = `${dir}/delext.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders emoticons.txt`, () => {
      const filepath = `${dir}/emoticons.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders grid_tables.txt`, () => {
      const filepath = `${dir}/grid_tables.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders kbd.txt`, () => {
      const filepath = `${dir}/kbd.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders math.txt without custom config`, () => {
      const filepath = `${dir}/math.txt`
      const config = remarkConfigOverride({katex: {}, math: {}})
      return renderFile(config)(filepath).then((tex) => {
        expect((tex.match(/\$\$/g) || []).length).toBe(0)
        expect((tex.match(/\\\[/g) || []).length).toBe(1)
        expect((tex.match(/\$/g) || []).length).toBe(6)
      })
    })

    it(`properly renders math.txt`, () => {
      const filepath = `${dir}/math.txt`
      return renderFile()(filepath).then((tex) => {
        expect((tex.match(/\$\$/g) || []).length).toBe(0)
        expect((tex.match(/\\\[/g) || []).length).toBe(1)
        expect((tex.match(/\$/g) || []).length).toBe(6)
      })
    })

    it.skip(`properly renders smart_legend.txt`, function () {
      const filepath = `${dir}/smart_legend.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })
    it.skip(`properly renders smart_legend_bis.txt`, function () {
      const filepath = `${dir}/smart_legend_bis.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders subsuperscript.txt`, () => {
      const filepath = `${dir}/subsuperscript.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders urlize.txt`, () => {
      const filepath = `${dir}/urlize.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders video_extra.txt`, () => {
      const filepath = `${dir}/video_extra.txt`
      const config = remarkConfigOverride({iframes: {
        'www.youtube.com': {
          tag: 'iframe',
          width: 560,
          height: 315,
          disabled: false,
          replace: [
            ['watch?v=', 'embed/'],
            ['http://', 'https://'],
          ],
          removeAfter: '&',
        },
        'jsfiddle.net': {
          tag: 'iframe',
          width: 560,
          height: 560,
          disabled: true,
          replace: [
            ['http://', 'https://'],
          ],
          append: 'embedded/result,js,html,css/',
        },
      }})
      return expect(renderFile(config)(filepath)).resolves.toMatchSnapshot()
    })

    it(`properly renders video.txt`, () => {
      const filepath = `${dir}/video.txt`
      return expect(renderFile()(filepath)).resolves.toMatchSnapshot()
    })
  })
})

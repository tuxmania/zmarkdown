const clone = require('clone')
const zmarkdown = require('../')
const remarkConfig = require('../config/remark')
const rebberConfig = require('../config/rebber')

// this object is used to memoize configured processors
const processors = {}

module.exports = function markdownHandlers (Raven) {
  return {
    toEPUB,
    toHTML,
    toLatex,
    toLatexDocument,
  }

  function toEPUB (markdown, opts = {}, callback) {
    const target = 'html'

    opts.heading_shift = 2
    opts.disable_ping = true
    opts.disable_jsfiddle = true
    opts.inline = false

    render(target, markdown, opts, callback)
  }

  function toHTML (markdown, opts = {}, callback) {
    const target = 'html'

    opts.heading_shift = 2
    opts.disable_images_download = true

    render(target, markdown, opts, callback)
  }

  function toLatex (markdown, opts = {}, callback) {
    const target = 'latex'

    opts.heading_shift = 0
    opts.disable_ping = true

    render(target, markdown, opts, callback)
  }

  function toLatexDocument (markdown, opts = {}, callback) {
    const target = 'latex'
    const template = zmarkdown().latexDocumentTemplate

    opts.heading_shift = 0
    opts.disable_ping = true

    render(target, markdown, opts, (err, [latex, metadata, messages] = []) => {
      if (err) return callback(err, markdown)

      try {
        const latexDocument = template(Object.assign(opts, {latex}))
        return callback(null, [latexDocument, {}, messages])
      } catch (e) {
        Raven.captureException(e)
        return callback(e)
      }
    })
  }

  function render (target, markdown, opts = {}, callback) {
    if (typeof markdown !== 'string') {
      return callback(new Error(`Markdown to render should be 'string', got` +
      `'${typeof markdown}' instead`))
    }
    if (!['html', 'latex'].includes(target)) {
      return callback(new Error(`Unknown target 'target=${target}'`))
    }

    /* zmd parser memoization */
    const key = String(target) + JSON.stringify(opts)
    if (!processors.hasOwnProperty(key)) {
      const remark = clone(remarkConfig)
      const rebber = clone(rebberConfig)

      /* presets */
      if (opts.disable_ping === true) {
        remark.ping.pingUsername = () => false
      }

      if (typeof opts.heading_shift === 'number') {
        remark.headingShifter = opts.heading_shift
      }

      if (opts.disable_jsfiddle === true) {
        remark.iframes['jsfiddle.net'].disabled = true
        remark.iframes['www.jsfiddle.net'].disabled = true
      }

      remark.imagesDownload.disabled = opts.disable_images_download === true
      if (remark.imagesDownload.disabled !== true) {
        if (opts.images_download_dir) {
          remark.imagesDownload.downloadDestination = opts.images_download_dir
        }
        if (
          Array.isArray(opts.local_url_to_local_path) && opts.local_url_to_local_path.length === 2
        ) {
          remark.imagesDownload.localUrlToLocalPath = opts.local_url_to_local_path
        }
      }

      if (opts.inline === true) {
        remark.disableTokenizers = {
          block: [
            'indentedCode',
            'fencedCode',
            'blockquote',
            'atxHeading',
            'setextHeading',
            'footnote',
            'table',
            'custom_blocks',
          ],
        }
      }

      processors[key] = zmarkdown({remarkConfig: remark, rebberConfig: rebber}, target)
    }

    processors[key].renderString(markdown, (err, {contents, data, messages} = {}) => {
      const metadata = data

      if (err) {
        Raven.mergeContext({
          extra: {
            zmdConfig: makeSerializable(processors[key].config),
            markdown: markdown,
            zmdOutput: {
              contents: contents,
              metadata: metadata,
              messages: messages,
            },
          },
        })
        return callback(err, markdown)
      }

      callback(null, [contents, metadata, messages])
    })
  }
}

function makeSerializable (obj) {
  return JSON.parse(JSON.stringify(obj))
}
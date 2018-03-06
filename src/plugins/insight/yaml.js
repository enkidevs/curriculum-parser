const visit = require('unist-util-visit')
module.exports = function yaml () {
  return transform

  function transform (ast) {
    visit(ast, 'yaml', parseYaml)
  }

  function parseYaml (node) {
    const { links } = node.data.parsedValue
    if (Array.isArray(links)) {
      node.data.parsedValue.links = links.map(getMarkdownLink)
    }
  }
}

// https://github.com/chjj/marked/blob/master/lib/marked.js#L455 (slightly hacked with {type})
const mdUrlRegEx = /\[(.*)\]\((.*)\)/
const mdUrlRegExWithType = /\[(.*)\]\((.*)\)\{(.*)\}/

function getMarkdownLink (link) {
  let result
  if (mdUrlRegExWithType.test(link)) {
    result = mdUrlRegExWithType.exec(link)
    return { name: result[1], url: result[2], nature: result[3] }
  }
  if (mdUrlRegEx.test(link)) {
    result = mdUrlRegEx.exec(link)
    return { name: result[1], url: result[2], nature: 'website' }
  }
  console.log('not found', mdUrlRegExWithType.test(link))
  return {
    nature: 'website',
    name: getDomainFromURL(link),
    url: link
  }
}

// http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
function getDomainFromURL (url) {
  if (url) {
    let domain
    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
      domain = url.split('/')[2]
    } else {
      domain = url.split('/')[0]
    }

    // find & remove port number
    domain = domain.split(':')[0]

    return domain
  }
  return null
}

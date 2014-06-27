var compile = require('marked')
var path = require('path')
var fs = require('fs')
module.exports = function(opts){
  var dir = path.resolve(opts.directory)
  var extend = opts.extend
  return function(req, res, next){
    var file = req.url + ".md"
    file = path.join(dir, file)
    try {
      fs.readFile(file, 'utf8', function (err, contents) {
        if (err) return res.redirect('/404')
        compile(contents, {
          gfm: true,
          pedantic: false,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        }, function (err, html) {
          if (err) return res.redirect('/501')
          extend(req, res, html)
        })
      })
    } catch (err) {
      next(err)
    }
  }
}

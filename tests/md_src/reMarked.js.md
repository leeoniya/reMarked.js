reMarked.js
-----------
client-side DOM > markdown _(MIT Licensed)_

---
A project similar to [Markdownify](http://milianw.de/projects/markdownify/) but executed on the client. The ultimate goal is integration with existing WYSIWYG html editors (eg: TinyMCE, CKeditor, Loki, CLeditor) to produce Markdown output. There are currently no WYSIWYG editors for markdown, only WYSIWYM, which still require knowledge of markdown syntax and its many quirky flavors.

---
### Usage

``` js
// optional options w/defaults
var options = {
    link_list:	false,		// render links as references, create link list as appendix
    h1_setext:	true,		// underline h1 headers
    h2_setext:	true,		// underline h2 headers
    h_atx_suf:	false,		// header suffixes (###)
    gfm_code:	false,		// render code blocks as via ``` delims
    li_bullet:	"*",		// list item bullet style
    hr_char:	"-",		// hr style
    indnt_str:	"    ",		// indentation string
    emph_char:	"*"			// char used for strong and em
}

var reMarker = new reMarked(options);

var markdown = reMarker.render(document.body);
```
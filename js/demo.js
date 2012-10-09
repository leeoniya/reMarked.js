function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$(document).ready(function() {
	var $ctr = $(".markdown-body"),
		$nav = $("#nav"),
		$rem = $("#remarked"),
		$btn = $("#btn_remark");

	$btn.jrumble({speed: 50});

	for (var i in list)
		$nav.append($("<li/>", {text: list[i]}));

	$nav.on("click", "li", function(){
		$.get("tests/md_htm/marked/" + $(this).text() + ".md.htm", function(markup) {
			$ctr.html(markup);
			$rem.hide();
			$ctr.show();

			$btn.trigger('startRumble');
			window.setTimeout(function(){$btn.trigger('stopRumble');}, 500);
		});

		$(this).addClass("active").siblings().removeClass("active");
	});

	$btn.on("click", function(){
		$ctr.hide();

		var options = {
			link_list:  false,    // render links as references, create link list as appendix
			h1_setext:  true,     // underline h1 headers
			h2_setext:  true,     // underline h2 headers
			h_atx_suf:  false,    // header suffixes (###)
			gfm_code:   true,     // gfm code blocks (```)
			li_bullet:  "*",      // list item bullet style
			hr_char:    "-",      // hr style
			indnt_str:  "    ",   // indentation string
			bold_char:  "*",      // char used for strong
			emph_char:  "_",      // char used for em
			gfm_tbls:   true,     // markdown-extra tables
			tbl_edges:  false,    // show side edges on tables
			hash_lnks:  false,    // anchors w/hash hrefs as links
		}

		var reMarker = new reMarked(options);

		var markdown = reMarker.render($ctr[0]);

		$rem.html(htmlEntities(markdown));

		$rem.show();
	});

	$nav.children().eq(0).click();
});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$(document).ready(function() {
	var $ctr = $(".markdown-body"),
		$nav = $("#nav"),
		$rem = $("#remarked"),
		$btn = $("#btn_remark"),
		$cust = $("#html-inp");

	$btn.jrumble({speed: 50});

	for (var i in list)
		$nav.append($("<li>", {text: list[i]}));

	$nav.append($("<li>", {html: "your html"}).addClass("cust-html"));

	$nav.on("click", "li", function(){
		var $t = $(this);

		$rem.hide();
		$cust.hide();

		if ($t.hasClass("cust-html")) {
			$cust.show();
			$ctr.hide();
		}
		else {
			$.get("tests/md_htm/marked/" + $t.text() + ".md.htm", function(markup) {
				$ctr.html(markup);
				$ctr.show();

				$btn.trigger('startRumble');
				window.setTimeout(function(){$btn.trigger('stopRumble');}, 500);
			});
		}
		$t.addClass("active").siblings().removeClass("active");
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
			gfm_del:    true,     // ~~strikeout~~ for <del>strikeout</del>
			gfm_tbls:   true,     // markdown-extra tables
			tbl_edges:  false,    // show side edges on tables
			hash_lnks:  false,    // anchors w/hash hrefs as links
			br_only:    false     // avoid using "  " as line break indicator
		};

		var reMarker = new reMarked(options);

		if ($cust.is(":visible")) {
			var markdown = reMarker.render($cust.val());
			$cust.hide();
		}
		else
			var markdown = reMarker.render($ctr[0]);

		$rem.html(htmlEntities(markdown));

		$rem.show();
	});

	$nav.children().eq(0).click();
});

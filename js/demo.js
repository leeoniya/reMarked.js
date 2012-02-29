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

		// optional options w/defaults
		var options = {
			link_list:  false,      // render links as references, create link list as appendix
			h1_setext:  true,       // underline h1 headers
			h2_setext:  true,       // underline h2 headers
			h_atx_suf:  false,      // header suffixes (###)
			gfm_code:   false,      // render code blocks as via ``` delims
			li_bullet:  "*",        // list item bullet style
			hr_char:    "-",        // hr style
			indnt_str:  "    ",     // indentation string
			emph_char:  "*"         // char used for strong and em
		}

		var reMarker = new reMarked(options);

		var markdown = reMarker.render($ctr[0]);

		$rem.html(htmlEntities(markdown));

		$rem.show();
	});

	$nav.children().eq(0).click();
});

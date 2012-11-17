function init () {

// global dimensions
var cwidth = 600;
var cheight = cwidth;
var nwidth = cwidth * 0.1;
var nmargin = cwidth * 0.025;
var rwidth = cwidth * 0.5;
var heigth = cheight * 0.05;

// draw dna strand
var paper = Raphael("canvas", cwidth, cheight);

    // draw red bar
var r_y = cheight * 0.025;
var r = paper.rect(0, r_y, rwidth, heigth);
r.attr({fill: "#D23727", stroke: "#D23727"});

    // draw nucleotides
function nucleotide(x, y, color) {
    n = paper.rect(x, y, nwidth, nwidth);
    n.attr({fill: color, stroke: color});
    return n;
}
var colors = ["#71B3E2", "#84459A", "#029848", "#F17B22"];
var nucleotides = []
var x_pos = []
var n_offset = rwidth + nmargin;
for(var i=0; i< 4; ++i) {
    x_pos[i] = n_offset + i * (nwidth + nmargin);
    nucleotides[i] = nucleotide(x_pos[i], 0, colors[i]);
}

    // animation
function animate_strand () {
    r.animate({width:cwidth}, 2000, "<");
    for(var i=0 ; i < 4; ++i){
        var dx = -n_offset + i * (n_offset /3);
        x_pos[i] = x_pos[i] + dx    // for further use
        nucleotides[i].animate({x:x_pos[i]}, 2000, "<");
    }
}
var lang = []

function show_text () {
    var lang_txt = ["Francais", "English", "Mobile"];
    var lang_url = ["fr/play.html", "eng/play.html", "http://phylo.cs.mcgill.ca/mobile"]
    for (var i=0;i<3;++i){
        var pos = nmargin + x_pos[i] + nwidth + 45;
        lang[i] = paper.text(pos, nwidth * 0.5, lang_txt[i]).attr({
            fill:"#D0D0D0", 
            "stroke-width": 0,
            "font-size":20,
            opacity: 0,
            "font-weight":"normal",
            "font-family": "Century Gothic", 
            "href":lang_url[i]
        });
        var blanket = paper.rect().attr(lang[i].getBBox()).attr({
            fill: "#000",
            opacity: 0,
            cursor: "pointer",
            "href":lang_url[i]
            })
        lang[i].animate({opacity:1}, 2000, "<");
        lang[i].hover(
            function (event) {
                this.attr({fill: "white"});
            }
            , function (event) {
                this.attr({fill: "#D0D0D0"});
            } 
        );
        blanket.pair = lang[i];
        blanket.hover(
            function (event) {
                this.pair.attr({fill: "white"});
            }
            , function (event) {
                this.pair.attr({fill: "#D0D0D0"});
            } 
        );
    }
}

animate_strand();
setTimeout(show_text, 1000);

}

window.onload = init;


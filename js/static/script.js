function init () {

var url = new String(document.location);
var language = 'english'; // default
if (url.indexOf('/fr') != -1) {
    language = 'french';
}
// global dimensions
// get client width
var w = 0;
if (window.innerWidth){
      w = window.innerWidth;
} else if(document.documentElement &&
           (document.documentElement.clientWidth || 
            document.documentElement.clientHeight)) { 
            w = document.documentElement.clientWidth;
}

var nwidth = 80;

// draw dna strand
var paper = Raphael("canvas", w, 200);

    // move nucleotide n by dx
function move(n, dx) {

      // Move main element
    n.attr({x:30});

      // Move paired element
    n.pair.attr({x: n.x + dx});
    return n;
}

var nucleotides = []
var font = '"century gothic", arial';
var colors = ["#71B3E2", "#84459A", "#029848", "#F17B22", "#71B3E2", "#84459A", "#029848", "#F17B22"];
var menu = []
if(language == "french") {
     menu = [['Jouer', 'play.html'], ['Tutoriel', 'tutorial.html'], ['A propos', 'about.html'], ['Contri-\nbuteurs', 'credits.html']];
} else {
    menu = [['Play', 'play.html'], ['Tutorial', 'tutorial.html'], ['About', 'about.html'], ['Credits', 'credits.html']];
}

var positions = []
var x_offset = w * 0.5 / menu.length
for(var i=0; i<menu.length; i++) {
    x = x_offset*i + x_offset/2 - nwidth/2
    positions.push(x);
}

    // nucleotide objects
function nucleotide(i, x, y, color, txt, url) {
    var square, label;
    square = paper.rect(x, y, nwidth, nwidth, 3).attr({"href":url}).attr({fill: color, stroke: color, "stroke-width": 3});
    label = paper.text(x+nwidth/2, y + nwidth/2, txt).attr({fill:"white", "font-family": font, "font-size":14, "href":url});
    square.pair = label;
    label.pair = square;
    label.hover(
            function (event) {
                this.pair.animate({transform:"r45"}, 200);
            },
            function (event) {
                this.pair.animate({transform:"r0"}, 200);
            }
    );
    square.hover(
            function (event) {
                this.animate({transform:"r45"}, 200);
            },
            function (event) {
                this.animate({transform:"r0"}, 200);
            }
    );
    return square;
};
var yoffset = 50;
var logo_width = w * 0.15
    // make dna strand
var redline = paper.rect(0, nwidth/2+15+yoffset, w, 10).attr({fill:"#D23727", stroke:"#D23727"});

    // make logo
var logo = paper.rect(w*0.20, -10, logo_width, 80, 20).attr({fill:"#303030", stroke:"#303030", "href":"http://phylo.cs.mcgill.ca"});
var logo_text = paper.text(w*0.20 + logo_width*0.5, 25, "phylo").attr({fill:"#eee", "stroke-width":0,"font-family": font, "font-size":40, "href":"http://phylo.cs.mcgill.ca"});
logo.pair = logo_text;
logo_text.pair = logo;
logo.hover(
        function (event) {
            this.animate({fill:"#636363", stroke:"#636363"}, 100);
            this.pair.animate({fill:"#fff", stroke:"#636363"}, 100);
        }, 
        function (event) {
            this.animate({fill:"#303030", stroke:"#303030"}, 100);
            this.pair.animate({fill:"#eee", stroke:"#303030"},100);
        }
    );
logo_text.hover(
        function (event) {
            this.pair.animate({fill:"#636363", stroke:"#636363"}, 100);
            this.animate({fill:"#fff", stroke:"#636363"}, 100);
        }, 
        function (event) {
            this.pair.animate({fill:"#303030", stroke:"#303030"}, 100);
            this.animate({fill:"#eee", stroke:"#303030"},100);
        }
    );


    // make nucleotides
for(var i=0; i< menu.length; ++i) {
    nucleotides[i] = new nucleotide(i, positions[i] + w*0.35, 20+yoffset, colors[i], menu[i][0], menu[i][1]);
}

}

window.onload = init;


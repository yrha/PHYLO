#/usr/bin/python
import os, sys, getopt

def usage(softname):
    print "%s -c <category> -r <ranking>"

###############################################################################

def main():

    dirname="phylo_data_release_2011/"
    outdir="phylo_data_release_2011"

    f=sys.stdout

    print >>f,"<html>"
    print >>f,"<head>"
    print >>f, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
    print >>f, "<link href=\"results.css\" media=\"screen\" rel=\"Stylesheet\" type=\"text/css\" />"
    print >>f, "<link href=\"sitemapstyler/sitemapstyler.css\" rel=\"stylesheet\" type=\"text/css\" media=\"screen\" />"
    print >>f, "<script type=\"text/javascript\" src=\"sitemapstyler/sitemapstyler.js\"></script>"
    print >>f,"</head>"
    print >>f,""
    print >>f,"<body>"
    
    print >>f, "<div id=\"container\">"
    print >>f, "<div id=\"content\">"
    print >>f, "<noscript><p><strong>Sorry, you need to enable JavaScript to view this page</strong></p></noscript>"
    print >>f, ""
    
    chrdirlist = os.listdir(dirname)
    print >>f, "<ul  id=\"sitemap\">"
    for chrdir in sorted(chrdirlist):
        if chrdir.startswith('.'):
            continue
        genedirlist = os.listdir(dirname+'/'+chrdir)
        print >>f, "<li><a href=\"#\">%s</a>" % (chrdir)
        print >>f, "<ul>"
        for genedir in sorted(genedirlist):
            if genedir.startswith('.'):
                continue
            filelist = os.listdir(dirname+'/'+chrdir+'/'+genedir)
            print >>f, "<li><a href=\"#\">%s</a>" % (genedir)
            print >>f, "<ul>"
            for filename in sorted(filelist):
                if genedir.startswith('.'):
                    continue
                print >>f, "<li><a href=\"%s\" target=\"_blank\">%s</a></li>" % (outdir+'/'+chrdir+'/'+genedir+'/'+filename,filename)
            print >>f, "</ul>"
        print >>f, "</ul>"
    print >>f, "</ul>"
    print >>f, "</body>"
    print >>f, "</html>"

###############################################################################

if __name__ == '__main__':
    
    try:
        opts, args = getopt.getopt(sys.argv[1:], "h", ["help"]);
    except getopt.GetoptError:
        usage(sys.argv[0]);
    
    argStart=len(sys.argv);
    for o,a in opts:
        if o in ("-h", "--help"):
            usage(sys.argv[0]);
            sys.exit(1)
    
    main();





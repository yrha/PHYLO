/*
*
* PHYLO Distribution Build v3.1.0
* http://phylo.cs.mcgill.ca
*
* Copyright 2013 McGill university, Alfred Kam, Jerome Waldispuhl and other contributors
* Under McGill Human-Computing Developer Licence
* https://github.com/McGill-CSB/PHYLO/blob/master/McGill-LICENCE.txt
*
*/$.extend($.fn.dataTableExt.oStdClasses,{sWrapper:"dataTables_wrapper form-inline"}),$.fn.dataTableExt.oApi.fnPagingInfo=function(a){return{iStart:a._iDisplayStart,iEnd:a.fnDisplayEnd(),iLength:a._iDisplayLength,iTotal:a.fnRecordsTotal(),iFilteredTotal:a.fnRecordsDisplay(),iPage:Math.ceil(a._iDisplayStart/a._iDisplayLength),iTotalPages:Math.ceil(a.fnRecordsDisplay()/a._iDisplayLength)}},$.extend($.fn.dataTableExt.oPagination,{bootstrap:{fnInit:function(a,b,c){var d=a.oLanguage.oPaginate,e=function(b){b.preventDefault(),a.oApi._fnPageChange(a,b.data.action)&&c(a)};$(b).addClass("pagination").append('<ul><li class="prev disabled"><a href="#">&larr; '+d.sPrevious+'</a></li><li class="next disabled"><a href="#">'+d.sNext+" &rarr; </a></li></ul>");var f=$("a",b);$(f[0]).bind("click.DT",{action:"previous"},e),$(f[1]).bind("click.DT",{action:"next"},e)},fnUpdate:function(a,b){var c,d,e,f,g,h=5,i=a.oInstance.fnPagingInfo(),j=a.aanFeatures.p,k=Math.floor(h/2);for(i.iTotalPages<h?(f=1,g=i.iTotalPages):i.iPage<=k?(f=1,g=h):i.iPage>=i.iTotalPages-k?(f=i.iTotalPages-h+1,g=i.iTotalPages):(f=i.iPage-k+1,g=f+h-1),c=0,iLen=j.length;iLen>c;c++){for($("li:gt(0)",j[c]).filter(":not(:last)").remove(),d=f;g>=d;d++)e=d==i.iPage+1?'class="active"':"",$("<li "+e+'><a href="#">'+d+"</a></li>").insertBefore($("li:last",j[c])[0]).bind("click",function(c){c.preventDefault(),a._iDisplayStart=(parseInt($("a",this).text(),10)-1)*i.iLength,b(a)});0===i.iPage?$("li:first",j[c]).addClass("disabled"):$("li:first",j[c]).removeClass("disabled"),i.iPage===i.iTotalPages-1||0===i.iTotalPages?$("li:last",j[c]).addClass("disabled"):$("li:last",j[c]).removeClass("disabled")}}}}),$(document).ready(function(){$("#example").dataTable({sDom:"<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",sPaginationType:"bootstrap",oLanguage:{sLengthMenu:"_MENU_ records per page"},aaSorting:[[1,"asc"]],aoColumns:[{bVisible:!1},{iDataSort:0},null,null,null,{bVisible:!1},{iDataSort:4},{bVisible:!1},{iDataSort:6},{bVisible:!1},{iDataSort:8},{bVisible:!1},{iDataSort:9}]})});
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function ldbd_tmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {pug_html = pug_html + "\u003C!--Created by tlakatlekutl on 09.03.17.\n--\u003E\u003Cmain\u003E\u003Cdiv class=\"return-on-main\" id=\"return_on_main_rating\"\u003EНа главную\u003C\u002Fdiv\u003E\u003Cdiv class=\"title\"\u003EРейтинг\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E\u003Cdiv class=\"rating\"\u003E\u003Cdiv class=\"selection-group\" id=\"selection-group\"\u003E\u003Ch4 class=\"selection-group__score\"\u003EОчки\u003C\u002Fh4\u003E\u003Ch4 class=\"selection-group__quickness\"\u003EСкорость\u003C\u002Fh4\u003E\u003Ch4 class=\"selection-group__friend-duel\"\u003EС друзьями\u003C\u002Fh4\u003E\u003C\u002Fdiv\u003E\u003Cul class=\"scrollable-list\" id=\"scroll_list_rating\"\u003E";
// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var user = $$obj[index];
pug_html = pug_html + "\u003Cli class=\"scrollable-list__item\"\u003E\u003Cdiv class=\"record\"\u003E\u003Ch4 class=\"record__number\"\u003E" + (pug_escape(null == (pug_interp = user.id) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Ch4 class=\"record__name\"\u003E" + (pug_escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Ch4 class=\"record__score\"\u003E" + (pug_escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var user = $$obj[index];
pug_html = pug_html + "\u003Cli class=\"scrollable-list__item\"\u003E\u003Cdiv class=\"record\"\u003E\u003Ch4 class=\"record__number\"\u003E" + (pug_escape(null == (pug_interp = user.id) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Ch4 class=\"record__name\"\u003E" + (pug_escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Ch4 class=\"record__score\"\u003E" + (pug_escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;}
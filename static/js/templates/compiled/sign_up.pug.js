function sign_up_tmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!--   Created by sergey on 09.03.17.--\u003E\u003Cdiv class=\"sign_up_page\"\u003E\u003Cdiv class=\"return-on-main\"\u003E\u003Cbutton id=\"back_login\" type=\"submit\"\u003EНазад\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"title\"\u003EFastBall\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E\u003Cform class=\"input-form\" onsubmit=\"signup()\"\u003E\u003Cdiv class=\"input-form__name\"\u003EСоздать учетную запись\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-repeat-block\"\u003E\u003Ch3\u003EВведите E-mail\u003C\u002Fh3\u003E\u003Cdiv class=\"input-block input-e-mail\"\u003E\u003Cinput class=\"input-block__e-mail\" type=\"text\" placeholder=\"E-mail\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"repeat-block repeat-e-mail\"\u003E\u003Cinput class=\"repeat-block__e-mail\" type=\"text\" placeholder=\"Подтвердить E-mail\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-repeat-block\"\u003E\u003Ch3\u003EВведите пароль\u003C\u002Fh3\u003E\u003Cdiv class=\"input-block input-password\"\u003E\u003Cinput class=\"input-block__password\" type=\"password\" placeholder=\"Пароль\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"repeat-block repeat-password\"\u003E\u003Cinput class=\"repeat-block__password\" type=\"password\" placeholder=\"Подтвердить пароль\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-block input-nickname\"\u003E\u003Ch3\u003EВведите имя\u003C\u002Fh3\u003E\u003Cinput class=\"input-block__nickname\" type=\"text\" placeholder=\"Имя\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"button-submit-account\"\u003E\u003Cbutton type=\"submit\"\u003EСоздать учетную запись!\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}
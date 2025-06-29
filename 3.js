(function() {
    if (window.__lc) return; // Hindari double loading
    window.__lc = window.__lc || {};
    window.__lc.license = 19188360;

    (function(n, t, c) {
        var i = function() {
            i.c(arguments)
        };
        i.q = [];
        i.c = function(n) {
            i.q.push(n)
        };
        t.__lc = i;

        var e = t.createElement(c);
        e.async = true;
        e.src = 'https://cdn.livechatinc.com/tracking.js';

        var s = t.getElementsByTagName(c)[0];
        s.parentNode.insertBefore(e, s);
    })(window, document, 'script');
})();

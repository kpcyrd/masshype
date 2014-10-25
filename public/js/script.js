$(document).ready(function() {
    $('.qr').click(function() {
        var addr = $('#addr').text()
        var pk = $('#publickey').text()
        var pw = this.parentNode.children[0].textContent;
        var txt = 'cjdns://' + addr + '?pk=' + escape(pk) + '&pw=' + escape(pw);

        var canvas = $('#qr')[0];
        qrcode = new qrcodelib.qrcodedraw()
        qrcode.draw(canvas, txt, function() {});
    });
});

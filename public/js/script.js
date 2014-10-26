$(document).ready(function() {
    if($('#qr')) {
        var addr = $('#addr').text();
        var pk = $('#pk').text();
        var pw = $('#pw').text();
        var txt = 'cjdns://' + addr + '?pk=' + escape(pk) + '&pw=' + escape(pw);

        var canvas = $('#qr')[0];
        qrcode = new qrcodelib.qrcodedraw();
        qrcode.draw(canvas, txt, function() {});
    }
});

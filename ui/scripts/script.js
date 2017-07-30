/* global $:false */

'use strict';

$(document).ready(function () {

    setInterval(function () {
      $.ajax('api/v1/count').then(function (data) {
        $('#count').text(data.count);
        $('#count-version').text(data.version);
        $('#count-kind')
          .text(data.kind)
          .removeClass('label-success')
          .removeClass('label-warning')
          .addClass(data.kind === 'primary' ? 'label-success' : 'label-warning');
      });

      $.ajax('api/v1/ip').then(function (data) {
        $('#ip').text(data.last_ip + ' at ' + data.time);
        $('#ip-version').text(data.version);
        $('#ip-kind')
          .text(data.kind)
          .removeClass('label-success')
          .removeClass('label-warning')
          .addClass(data.kind === 'primary' ? 'label-success' : 'label-warning');
      });

    }, 500);

});

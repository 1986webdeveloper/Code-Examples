$( document ).ready(function() {
var totalRecord = '';
var data = JSON.parse($('#empdata').val());
	tinymce.init({
      selector: 'textarea',
      height: 300,
      theme: 'modern',
      statusbar: false,
      external_plugins: {
        'mention' : 'http://stevendevooght.github.io/tinyMCE-mention/javascripts/tinymce/plugins/mention/plugin.js'
      },
      content_css: 'http://stevendevooght.github.io/tinyMCE-mention/stylesheets/rte-content.css',
      skin_url: 'http://stevendevooght.github.io/tinyMCE-mention/stylesheets/tinymce/skins/light',
      plugins: "textcolor",
      toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor',
      mentions: {
        source:
           data
      }
    });

//insert data
  $(function() {
    $("#frm").on("submit", function(event) {
      event.preventDefault();
      var file = new FormData();

        //file.append('file',$('.file')[0].files[0]);
        var msg = tinyMCE.get('txtMessage').getContent();
        var id = $('#id').val();
        file.append('des',msg);
        file.append('id',id);

        $.ajax({
            url: "submit.php",  
            type: "post",
            data: file,
            processData: false,
            contentType: false, 
            success: function(d) {
             totalRecord = d;
             tinymce.get('txtMessage').setContent('');
            }
        });

    });
  }); //end insert data
  
//display msg at a time
setInterval(function()
{  

      var id = $('#id').val();
      var datetoday = $('.today-date').html();
      $.ajax({
            url: "displaymsg.php",  
            type: "post",
            data: { valid: id , total: totalRecord , datetoday: datetoday },
            success: function(res) {
              $('.allcomment').append(res);
              totalRecord = "";

            }
        });
}, 500);//time in milliseconds 

}); //end document
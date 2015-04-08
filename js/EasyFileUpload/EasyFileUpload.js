(function ( $ ) {

    $.fn.EasyFileUpload = function( options ) {

        var debug_prefix = "%c==== EasyFileUpload ===";
        var author = "Gabriel A. Barbosa <tx.gabrielbarbosa@gmail.com>";

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            debug: false,
            urlAjax: "upload.php",
            color: "blue",
            backgroundColor: "red",

            ajaxSucess: function (retorno) {
                if(settings.debug) {
                    console.log("Evento AjaxSucess Executed! : Retorno > " + retorno);
                }
            },
            ajaxBeforeSend: function() {
                if(settings.debug) {
                    console.log("Evento ajaxBeforeSend Executed! ");
                }
            }

        }, options );

        var count = function() {

            var countt = 0;

            $(this).each(function() {

                countt++;

            });

            return countt;
        }


        if(settings.debug) {

            var count = count();
            console.log(debug_prefix + " Init("+count+")",'color: blue');

            $(this).on('change', function (event, files, label) {

                var input_name = $(this).attr("name");
                var file_name = this.value.replace(/\\/g, '/').replace(/.*\//, '')

                console.log("Input: " + input_name + " change value to: " + file_name);

                if(file_name.length > 2) {

                    var data = new FormData();
                    data.append(input_name, $(this)[0].files[0]);

                    $.ajax({
                        url: settings.urlAjax,
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        beforeSend: function() {
                            settings.ajaxBeforeSend();
                        },
                        success: function(data){
                            settings.ajaxSucess(data);
                        }
                    });

                }

            });

        }


        if(settings.debug) {
            console.log("%c~\n~~\n~~~\nCreated By ~" + author + "\n~~~\n~~\n~",'color: gray');
        }

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });


    };

}( jQuery ));
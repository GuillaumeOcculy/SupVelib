$(document).ready( function() {

	$("#mail").blur(function(){
        $("#loader").show();
		//$('.message').html('');
		var email = $(this).val();

		$.ajax({
			type: "POST",
			url: "../controllers/register_check_email.php",
			data: "email="+email,
			success: function(msg){

				if(msg!="Email is okay"){
					$(".alert").html(msg);
				$(".alert").show();
				}else{
                    $(".alert").html(msg);
                    $(".alert").show();
                }

				$("#loader").hide();

			}

		});

	});


$("#signup").submit(function(){
    $("#loaderform").show();
   // $(".alert").show();

    var email = $(this).find("input[name=email]").val();
    var password = $(this).find("input[name=password]").val();
    var confirm = $(this).find("input[name=confirm]").val();
    $.ajax({
        type: "POST",
        url: "../controllers/register_check_form.php",
        data: "email="+email+"&password="+password+"&confirm="+confirm,
        success: function(msg){

                $(".alert").html(msg);
                $(".alert").show();

            $("#loaderform").hide();

        }
    });
        return false;
});

    $("#urlform").submit(function(){
        //$("#loaderform").show();
       // $(".alert").show();

        var name = $(this).find("input[name=name]").val();
        var url = $(this).find("input[name=url]").val();
        $(".alert").html("");
        $.ajax({
            type: "POST",
            url: "../controllers/url_check.php",
            data: "name="+name+"&url="+url,
            success: function(msg){
                $(".alert").html("");

                if(msg== " URL is not valid  <button type=\"button\" class=\"close\" informations-dismiss=\"alert\">&times;</button>"){



                $(".alert").html(msg);
                $(".alert").show();
                }else{
                    $(".alert").html("");

                    $(".alert").html(msg);
                    $(".alert").show();
                    setTimeout( function(){
                        location.reload();
                    }, 2000);


                }


               // $("#loaderurl").hide();

            }
        });
return false;
    });
});

//sanbox author:kira chu 
(function(){  
   function g() {}
	g.prototype.start = function() { 
		this.fbL=0;
    	 
    function init(){
   /*insert all necessary html element */

	//lightbox html structure
	var lbHTML=" <div id='fb-root'></div>"+
		      "	<div id='connection' class='white_content'></div>"+
		      " <div id='fade' class='black_overlay'></div>";

	var connectS="<ul id=connectS>"+
		     "<li><div id='MCBlogin'></div><button id='cLogin' class='cChoice'>Login</button></li>"+
		     "<li><div id='MCBregister'></div><button id='cRegister' class='cChoice'>Register</button></li>"+
		     "<li><span>Or just sign in instantly with:</span>"+
		     "<button id='faceB_login_B'></button></li>"+ 	
		     "</ul>";
	//login screen 
	var loginHTML=" <form id='emaiLG' onsubmit='return false;'><ul>"+
                      " <li class='descrip'>Username:</li>"+
                      " <li><input id='username' class='lInput' type='text' placeholder='nickname'></input></li>"+
                      " <li class='descript'>Password:</li>"+
                      " <li><input id='password' class='lInput' type='password' ></input></li>";

	var loginI="<input  type='submit' value='Login'>";

	//register screen
	var registerHTML="<li class='descript'>Email Address(Optional)</li>"+
			 "<li><input id='email' class='lInput' type='text' placeholder='Email Address' ></input></li></ul>";
	var registerI="<input type='submit' value='Register'>";
	var screenT="<p id='screenT'></p>";
 	if(document.getElementById("login") == undefined) {
				var div = document.createElement("div");
				div.className = "login";
				div.id = "login";
				document.body.appendChild(div);
				document.getElementById("login").innerHTML=lbHTML;
				document.getElementById("connection").innerHTML=connectS;
				$('#MCBlogin').html(screenT+loginHTML+"</ul></form>");
				$('#MCBregister').html(screenT+loginHTML+registerHTML+"</form>");
				reposition();


	}
	
	$('#cRegister').click(function(){
		$('#MCBregister').html(screenT+loginHTML+registerHTML+"</form>");
		if($(this).html() == "Register") {
			if($('#MCBlogin').css("display")!="none"){
				$('#MCBlogin').slideToggle();
				$('#cLogin').html("Login");
				$('#MCBlogin').html("");
			}
			$('#MCBregister').slideToggle();	 
			$(this).html(registerI);
			$('#screenT').html('REGISTRATION');
			$('.white_content').animate({height:'400px'},200);	 
			reposition();	
		}else {
			$('#MCBregister').slideToggle();	 
			$(this).html('Register');
		//REGISTER PHP	
				loading.install();
				var url = "../phpdb/phyloDB2.php";
				$.post(url, {"mode" : 6, "user" : $("#username").val() , "pass" : $("#password").val(), "email":$('#email').val() } , function(data) {
					loading.uninstall();
					if(data == "succ") {
						window.guest = $("#username").val();
					//	$("#login").remove();
						lightB_control('none');//close lightbox				
						$("#log").html("Log Out");
					}
					else {
						$('.white_content').animate({height:'200px'},200);	 
						reposition();	
						bug.lightbox("Oops! Conflicting Username");
					}
				}).error(function() {
					loading.uninstall();
						$('.white_content').animate({height:'200px'},200);	 
						reposition();	
					bug.lightbox("Oops! We couldnt connect to the server.<br>We suspect you are not connected to the internet!");
				}); 
		
		}//end else
	});

	$('#cLogin').click(function(){
		$('#MCBlogin').html(screenT+loginHTML+"</ul></form>");
		if($(this).html() == "Login") {
			$('#screenT').html('LOGIN');
			if($('#MCBregister').css("display")!="none"){
				$('#MCBregister').slideToggle();
				$('#cRegister').html("Register");
				$('#MCBregister').html("");
			}
			$('#MCBlogin').slideToggle();	 
			$('.white_content').animate({height:'350px'},200);	 
			$(this).html(loginI);
			reposition();	
				
		}else {
				$('#MCBlogin').slideToggle();	 
				$(this).html('Login');
		//LOGIN PHP
				//CONNECT TO USER DATABASE
				loading.install();
				var url = "../phpdb/phyloDB2.php";
				$.post(url, {"mode" : 7, "user" : $("#username").val() , "pass" : $("#password").val() } , function(data) {
					loading.uninstall();
					if(data == "succ") {
						window.guest = $("#username").val();
					//	$("#login").remove();
						lightB_control('none');//close lightbox				
						$("#log").html("Log Out");
					}
					else {
						$('.white_content').animate({height:'200px'},200);	 
						reposition();	
						bug.lightbox("Oops! Incorrect Credentials!");
					}
				}).error(function() {
					loading.uninstall();
					$('.white_content').animate({height:'200px'},200);	 
					reposition();	
					bug.lightbox("Oops! We couldnt connect to the server.<br>We suspect you are not connected to the internet!");
				}); 

		}//end else: actual login
	});

	//white lightbox repositioniting during window resize
	function reposition(){
		 var w=$('#connection').css('width').replace("px","");
		 var h=$('#connection').css('height').replace("px","");
	         
		 var ww=($(window).width()-w)/2;
		 var hh=($(window).height()-h)/2;
		 
		 if(ww<50){
			ww=50;	
		 }
		 if(hh<50){
			hh=50;
		 }

		 console.log("width:"+$(window).width());
		 $('#connection').css({top:hh,left:ww});	

	};
	//bind reposition to window resize
	$(window).bind('resize',reposition);


   }; 
   
    /*2. open/close login_lightbox*/
    function lightB_control(status){
            $('.black_overlay').css({display:status});
            $('.white_content').css({display:status});
            $('#MCBlogin').css({display:"none"})
			  .html("");
            $('#MCBregister').css({display:"none"})
			    .html("");
	    $('#cRegister').html("Register");
	    $('#cLogin').html("Login");
	    $('.white_content').animate({height:'200px'},200);	 

    };  

    
$(document).ready(function(){
	init();
	
	FB.init({
            appId  : '143395669089424',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true, // parse XFBML         
            oauth  : true // enable OAuth 2.0
        });

        $("#faceB_login_B").click(function(){
            FB.login(function(response) {
               if (response.authResponse) {
                //1.close lightbox
                lightB_control('none');
                $('login_LB_button').css({display:'none'});
            
            //2. show facebook username/pic at the top
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
			this.fbL=1;
			//remove login button 
                       //$('#welcome').html("welcome "+response.name +"!");
			var x = response.name;
			window.guest = response.name+"/"+ response.id;
			/*
			window.guest= {
				name: response.name,
				id:response.id,
				first_name:response.first_name,
				last_name:response.last_name,
				link:response.link,
				username:response.username,
				gender:response.gender,
				locale:response.local
			}*/
			console.log(response.local);
			$('#log').html("welcome:<span> "+x+"</span>");
			
             });
           } else {
             console.log('user cancel/doest not authorize facebook login');
             //keep lightbox opened for other login option
           }
         },{scope:'publish_actions,user_about_me'});
    
        });
       
	 
	//login or logout 
	$('#log').click(function(){
		if($(this).html() == "Log In") { 
	        	lightB_control('block');
        		$('#fade').click(function(){
           		lightB_control('none'); 
        	});
		} else {
                   	if(this.fbL===1){
			FB.logout(function(response) {
				console.log('Logged out.');
				});
			}
			$(this).html("Log In");
			window.guest = "guest";
			//log out
		}
	});
    });
	};
	var proto = g.prototype,
		attr = [["init",proto.start]];
		common.exportSingleton("login",g,attr);
})();

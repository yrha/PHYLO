

//sanbox author:kira chu 
(function(){  
    
    /*1. RESIZE Stablelize for Mobile*/
    //desktop Version: 
    
    //mobile Version:
     
    function f(){}
    function $(f){return document.getElementById(f);}
    f.prototype.init=function(){
   /*insert all necessary html element */

	var loginHtml=" <button id='loginB'>Login</button>"+
		      " <div id='fb-root'></div>"+
		      "	<div id='login_LB_content' class='white_content'>"+
                      " <form id='emaiLG'><ul>"+
                      " <li class='descrip'>Username or Email Address:</li>"+
                      " <li><input id='email' class='lInput' type='text' placeholder='Email Address'></input></li>"+
                      " <li class='descript'>Password:  <span><a href='#'>Forgot?</a></span></li>"+
                      " <li><input id='password' class='lInput' type='password' ></input></li>"+
                      " <li><button id='loginB'><input type='submit' value='Login'></button></li>"+
                      " <li id='lOption'>Or just sign in instantly with:<button id='faceB_login_B'></button></li>"+
                      "</ul></form></div><!--end login lightbox content--><div id='fade' class='black_overlay'></div>";
	
 	if(document.getElementById("login") == undefined) {
				var div = document.createElement("div");
				div.className = "login";
				div.id = "login";
				document.body.appendChild(div);
				document.getElementById("login").innerHTML=loginHtml;
	}
   }; 
   
    /*2. open/close login_lightbox*/
    f.prototype.lightB_control=function(status){
            $('#fade').css({display:status});
            $('#login_LB_content').css({display:status});

    };  

    var proto = f.prototype,
	attr=[["init",proto.init],
	      ["lightB_control", proto.lightB_control]];
	common.exportSingleton('login',f,attr);

})();
    
$(document).ready(function(){
	login.init();
	
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
                login.lightB_control('none');
                $('login_LB_button').css({display:'none'});
            
            //2. show facebook username/pic at the top
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
                        $('#log').html("welcome "+response.name +"!");
                   FB.logout(function(response) {
                     console.log('Logged out.');
               });
             });
           } else {
             console.log('user cancel/doest not authorize facebook login');
             //keep lightbox opened for other login option
           }
         },{scope:'publish_actions,user_about_me'});
    
        });
       
	 
	$('#log').click(function(){
		console.log('login pressed, should prompt lighbox');
	        login.lightB_control('block');
        	$('#fade').click(function(){
           		 login.lightB_control('none'); 
        	});
	});
    });



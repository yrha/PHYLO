/*
developed by: Kira Chu(www.cs.mcgill.ca/~cwu65).McGill MCB
supervisors: Jerome Waldispuhl, Mathieu Blanchette, McGill University
Type: Desktop/Tablet
Supported platform: Chrome, Safari, Firefox
About:Mcgill Phylo Project: Facebook, Local Database  User Connection

Copyright Chu Wu and McGill MCB
Version 0.0.2
Last Updated Sept 2011

*/



//THE FOLLOWING SANDBOX IS DEPRECATED: USED FOR NEW FB LOGIN CONSTRUCTION: 
//FBLogin.css need to change too. 

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
		
	var loginI="<input id='lSubmit' class='sub'  type='submit' value='Login'>";
	var registerI="<input id='rSubmit' class='sub' type='submit' value='Register'>";

	var connectS="<ul id=connectS>"+
		     "<li><input id='guestL' type='submit' value='Guest Login' class='sub'></li>"+
			 "<li><div id='MCBlogin'></div>"+loginI+"</li>"+
		     "<li><div id='MCBregister'></div>"+registerI+"</li>"+
		     "<li><span id='OO'>Or just sign in instantly with:</span>"+
		     "<div id='faceB_login_B'></div></li>"+ 	
		     "</ul>";
	//login screen 
	var loginHTML=" <form id='emaiLG' onsubmit='return false;'><ul>"+
                      " <li id='dU' class='descrip'>Username:</li>"+
                      " <li><input id='user_name' class='dInput' type='text' placeholder='nickname'></input></li>"+
                      " <li id='dP' class='descript'>Password:</li>"+
                      " <li><input id='pass_word' class='dInput' type='password' ></input></li>";


	//register screen
	var registerHTML="<li class='descript'>Email Address(Optional)</li>"+
			 "<li><input id='email' class='dInput' type='text' placeholder='Email Address' ></input></li></ul>";
	var screenT="<p id='screenT'></p>";
	

	
	//bind reposition to window resize
 	if(document.getElementById("loginKira") == undefined) {
				var div = document.createElement("div");
				div.className = "login";
				div.id = "loginKira";
				document.body.appendChild(div);
				document.getElementById("login").innerHTML=lbHTML;
				document.getElementById("connection").innerHTML=connectS;
				$('#MCBlogin').html(screenT+loginHTML+"</ul></form>");
				$('#MCBregister').html(screenT+loginHTML+registerHTML+"</form>");

				reposition();

	}
	
	//bind reposition to window resize
	$(window).bind('resize',reposition);	
	window.addEventListener("hashchange",
	function(){lightB_control("none");},false);
	
	$('#rSubmit').click(function(){
		if($('#MCBregister').html()==""){
			//insert content
			$('#MCBregister').html(screenT+loginHTML+registerHTML+"</form>");
			$('#screenT').html('REGISTRATION');
				
			//if login display is not closed yet
			if($('#MCBlogin').css("display")!="none"){
				$('#MCBlogin').slideToggle();
				$('#MCBlogin').html("");
			}

			$('#MCBregister').slideToggle();//open content	 
			$('#screenT').html('REGISTRATION');
			$('.white_content').animate({height:'470px'},200);	 
			reposition();	
		
		}else{
			console.log("useranme "+$('#user_name').val());
			if($('#user_name').val()===""){
				$('#dU').css({color:'red'});
			}else $('#dU').css("color","white");
			if($('#pass_word').val()===""){
				$('#dP').css({color:'red'});
			}else $('#dP').css("color","white");
			if($('#pass_word').val()!="" && $('#user_name').val()!=""){
				$('#dU').css({color:'white'});
				$('#dP').css({color:'white'});

			//REGISTER PHP	
				loading.install();
				var url = "../phpdb/phyloDB2.php";
				$.post(url, {"mode" : 6, "user" : $("#user_name").val() , "pass" : $("#pass_word").val(), "email":$('#email').val() } , function(data) {
					loading.uninstall();
					if(data == "succ") {
						window.guest = $("#user_name").val();
					//	$("#login").remove();
						lightB_control('none');//close lightbox				
						$("#log").html("Log Out");
						//create cookie
						mcb.cookie.create("PhyloLogin",$("#username").val(), 360);	
					}
					else {
						//problem with register 
						bug.lightbox("Oops! Conflicting Username");
						reposition();
						
					}
				}).error(function() {
					loading.uninstall();
					bug.lightbox("Oops! We couldnt connect to the server.<br>We suspect you are not connected to the internet!");
					reposition();
				}); 
			
			}
		}
	});//rSubmit


	$('#lSubmit').click(function(){
		if($('#MCBlogin').html()==="") {
			//insert content
			$('#MCBlogin').html(screenT+loginHTML+"</ul></form>");
			$('#screenT').html('LOGIN');
			
			//close register screen
			if($('#MCBregister').css("display")!="none"){
				$('#MCBregister').slideToggle();
				$('#MCBregister').html("");
			}
			
			//open content
			$('#MCBlogin').slideToggle();	 
			$('.white_content').animate({height:'450px'},200);	 
			reposition();	
		}else{
		
			//LOGIN PHP
			
			console.log("useranme"+$('#user_name').val());
			if($('#user_name').val()===""){
				$('#dU').css({color:'red'});
			}else $('#dU').css({color:'white'});
			if($('#pass_word').val()===""){
				$('#dP').css({color:'red'});
			}else $('#dP').css({color:'white'});
			if($('#pass_word').val()!="" && $('#user_name').val()!=""){
				$('#dU').css({color:'white'});
				$('#dP').css({color:'white'});
				//CONNECT TO USER DATABASE
				loading.install();
				var url = "../phpdb/phyloDB2.php";
				
				$.post(url, {"mode" : 7, "user" : $("#user_name").val() , "pass" : $("#pass_word").val() } , function(data) {
					loading.uninstall();
					console.log(data);
					if(data == "succ") {
						var name=$("#user_name").val();
						window.guest =name;
					//	$("#login").remove();
						lightB_control('none');//close lightbox	
						//create cookie
						console.log(name)
						mcb.cookie.create("PhyloLogin",name, 360);
									
						$("#log").html("Log Out");
					}
					else {
						//if not pass
						bug.lightbox("Oops! Incorrect Credentials!");
						reposition();
					}
				}).error(function() {
					loading.uninstall();
					bug.lightbox("Oops! We couldnt connect to the server.<br>We suspect you are not connected to the internet!");
					reposition();
				}); 
			}//end if password/username pass empty string test
		}//end else open login

	});



   }; 
   
    /*2. open/close login_lightbox*/
    function lightB_control(status){
            $('.black_overlay').css({display:status});
            $('.white_content').css({display:status});
            $('#MCBlogin').css({display:"none"})
			  .html("");
            $('#MCBregister').css({display:"none"})
			    .html("");
	    $('.white_content').animate({height:'290px'},200);	 
	    reposition();
    };  

	//white lightbox repositioniting during window resize
	function reposition(){
		 var w=$('#connection').css('width').replace("px","");
		 var h=$('#connection').css('height').replace("px","");
	         
		 var ww=($(window).innerWidth()-w)/2;
		 var hh=(mcb.deviceType=="desktop")?($(window).innerHeight()-h)/2:($(window).innerHeight()-h)/4;
		 
		 if(ww<50){
			ww=50;	
		 }
		 if(hh<50){
			hh=50;
		 }

		 //console.log("width:"+$(window).width());
		 $('#connection').css({top:hh,left:ww});	

	};

    
$(document).ready(function(){
	init();
	
	FB.init({
            appId  : '200256936686133',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true, // parse XFBML         
            oauth  : true // enable OAuth 2.0
        });
	var facebookC=false;

        $("#faceB_login_B").click(function(){
	    if(facebookC===true)return;
	    else 
		facebookC=true;
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
			
			mcb.cookie.create("PhyloFBLogin",window.guest, 360);
			FB.logout(function(response) {
			 console.log("facebook logout for security: we already save a cookie for this, cookie need to change a bit later");
			});
			facebookC=false;//reset click
			/*
			window.guest= {
				name: response.name,
				id:response.id,h
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
		facebookC=false;
           }
         },{scope:'publish_actions,user_about_me'});
    
        });
       
	//guest login
	$('#guestL').click(function(){
				
				if($('#MCBlogin').html()!=""){$('#MCBlogin').slideToggle(function(){
					$('.white_content').animate({height:'450px'},200);	 
					lightB_control('none');
	
				});}else if($('#MCBregister').html()!=""){
					
					$('#MCBregister').slideToggle(function(){
					$('.white_content').animate({height:'450px'},200);	 
					lightB_control('none');
	
					});//close content
				}	 
				else{	lightB_control('none');
				}
					});
	 
	//login or logout 
	/* dead code
	$('#log').click(function(){
		if($(this).html() == "Log In") { 
	        	lightB_control('block');
        	
		} else {
			//log out
		}
	}); */
	
	//logout
	$("#logout").click(function() {
		//logout
		if(this.fbL===1){
			FB.logout(function(response) {
				console.log('Logged out.');
			});
		}
		mcb.cookie.erase("PhyloLogin");
		mcb.cookie.erase("PhyloFBLogin");
		$("#checkGuestContent").remove();
	//	$(this).html("Log In");
		window.guest = "guest";
	});	

	//or play button!!!
	$("#playButton").click(function() {
		if($(this).html() == "PLAY") { 
				if(mcb.cookie.read("PhyloLogin")!=null){
						window.guest=mcb.cookie.read("PhyloLogin");
				}else if(mcb.cookie.read("PhyloFBLogin")!=null){
						window.guest=mcb.cookie.read("PhyloFBLogin");
						//var name=window.guest.toString().split("/");
				}else{
					lightB_control('block');
				}
		}//log out 
	});

    });
};
	var proto = g.prototype,
		attr = [["init",proto.start]];
		common.exportSingleton("login",g,attr);
})();


//-----------------------------------------------------------------------------------------------------//
//					NEW LOGIN CODE(WIP) 
//-----------------------------------------------------------------------------------------------------//


function initLoginB(){

	var skeleton=" <div id='fb-root'></div>"+
		     " <div id='LoginF'></div>";

	//button		
	var loginI="<input id='lSubmit' class='sub'  type='submit' value='Login'>";
	var registerI="<input id='rSubmit' class='sub' type='submit' value='Register'>";

	//extendable box
	var connectS="<ul id=connectS>"+
		     "<li><input id='guestL' type='submit' value='Guest Login' class='sub'></li>"+
			 "<li><div id='MCBlogin'></div>"+loginI+"</li>"+
		     "<li><div id='MCBregister'></div>"+registerI+"</li>"+
		     "<li><span id='OO'>Or just sign in instantly with:</span>"+
		     "<div id='faceB_login_B'></div></li>"+ 	
		     "</ul>";
	//login form 
	var loginHTML=" <form id='emaiLG' onsubmit='return false;'><ul>"+
                      " <li id='dU' class='descrip'>Username:</li>"+
                      " <li><input id='user_name' class='dInput' type='text' placeholder='nickname'></input></li>"+
                      " <li id='dP' class='descript'>Password:</li>"+
                      " <li><input id='pass_word' class='dInput' type='password' ></input></li>";


	//register form
	var registerHTML="<li class='descript'>Email Address(Optional)</li>"+
			 "<li><input id='email' class='dInput' type='text' placeholder='Email Address' ></input></li></ul>";
	//title
	var screenT="<p id='screenT'></p>";


	//create html box element for login box 
	var facebookRoot=" <div id='fb-root'></div>";
	$('#login_box').html(facebookRoot);
		// document.getElementById("login").innerHTML=lbHTML;
		//document.getElementById("connection").innerHTML=connectS;
		//$('#MCBlogin').html(screenT+loginHTML+"</ul></form>");
		//$('#MCBregister').html(screenT+loginHTML+registerHTML+"</form>");

	//Button Binding

};






// THE FOLLOWING IS A NEW LOGIN CODE FOR THE NEW MENU: STILL WORK IN PROGRESS

$(document).ready(function(){
	initLoginB();//init login binding

	//handle FB js API init
	/*FB.init({
            appId  : '200256936686133',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true, // parse XFBML         
            oauth  : true // enable OAuth 2.0
        });
	var facebookC=false;
	
	//Handle toggling
	$("#login_button").click(function(){
		console.log("this is kira testing the index page scope"+mcb.deviceType);
	});
        
	
	//handle facebook login button click action
	$("#Face_LoginB").click(function(){

        });//end facebook button click
	*/
    
});


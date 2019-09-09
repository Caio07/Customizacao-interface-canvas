/***************
Handtalk
****************/
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "//api.handtalk.me/plugin/latest/handtalk.min.js";
$("body").append(s);

setTimeout(function () {
  var ht = new HT({
    token: "5aea65a039daa42e5a691a9f02a589ab"
  });
}, 1000);

/***************
Alterar Fonte do Canvas (não sendo utilizado no momento)
****************/
/*
var f = document.createElement("link");
s.href = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap";
s.rel = "stylesheet";
$("body").append(s);*/



$(document).ready(function() {

	//Adicionar Portal do Aluno ao menu da esquerda
   $("#menu").append("<li id='portal-do-aluno' class='ic-app-header__menu-list-item'>\
	<a id='global_nav_portal_link' role='button' class='ic-app-header__menu-list-link' data-track-category='Portal do aluno e do Professor' target='_blank' data-track-label='Portal' href='http://portal.espm.br/?'>\
	<div class='menu-item-icon-container' aria-hidden='true'></div><div class='menu-item__text'>Portal do Aluno</div>\
	</a></li>");	
   //Abrir Canvas com o menu da esquerda fechado
   $('#primaryNavToggle[aria-label="Minimizar navegação global"]').trigger('click');
   //Abrir Tarefas mostrando por tipo
   if(window.location.pathname.indexOf('/assignments') >= 0){
			$("#show_by_type").trigger("click");
	  }
   //Inserir item to-do list no menu e não mostrá-lo quando tiver na página de calendário ou mensagens
   switch (window.location.pathname) {
    case '/calendar':
        $("#right-side-wrapper").removeClass('menu-todolist');
        $("#test_link").remove();
        break;
    case '/conversations':
        $("#right-side-wrapper").removeClass('menu-todolist');
        $("#test_link").remove();
        break;
    default: 
  		 $("#right-side-wrapper").addClass('menu-todolist');
         $("#menu").append("<li id='todolist-mobile' class='ic-app-header__menu-list-item'>\
	<a onclick='mostrar()' id='global_nav_todo_link' role='button' class='ic-app-header__menu-list-link' data-track-category='to do list' data-track-label='to do button' href='#'>\
	<div class='menu-item-icon-container' aria-hidden='true'></div><div class='menu-item__text'>A Fazer</div>\
	</a></li>");
  	}

  /***************
	Esconder botão de simular notas dos alunos
	****************/

  var currentUserName = ENV.current_user.display_name;
  //se estiver na página de notas
  if(window.location.pathname.indexOf('/grades') >= 0){

    //Se não for um admin
    if ($.inArray("admin", ENV.current_user_roles) == -1) {

    	 $.ajax({url:'/api/v1/users/self/profile', dataType: "json", success:function(jsonUser){
         var student_id = jsonUser.login_id;
         //Adiciona nome e RA do aluno no início do conteúdo
         $("#content").prepend("<h2 style='margin-bottom:2rem'>"+ currentUserName + " - " + student_id + "</h2>");
     	}});
    	 //Alteração de tradução
        $("#content h2:contains('commons')'Curso')").html("Disciplinas que faço");
        $("#print-grades-button-container").hide();
         //Adiciona o botão de imprimir
        $("#content").append("<button class='print-button'> Imprimir </button)");
     	$('.print-button').on('click', function() {  
		  window.print();  
		  return false;
		});
      }
    setTimeout(function() {
      //desabilita opção de testar uma nova nota
      $("td.assignment_score").unbind();
      $(".tooltip").unbind();
      $(".tooltip_wrap").css("display", "none");
      $(".assignment_score").each(function() {
        $(this).attr("title", "Sua Nota")
      });
    }, 1000);
  }

  		//exclui o itens Commons do menu da disciplina
		$(".course-options a:contains('Commons')").css("display", "none");
		//por padrão aluno tem o progresso total do curso
		$("#only_consider_graded_assignments").prop("checked", false);
		//Interface das mensagens no mobile
	 function myFunction(x) {
      if (x.matches) { // If media query matches
        //Interface das mensagens no mobile
      $(".message-detail").addClass("remover-mensagem");
      $(document).on("click", ".messages .message-middle-column", function(e){
        e.preventDefault();
        $(".message-list-scroller").removeClass("aparecer-mensagem");
        $(".message-detail").removeClass("remover-mensagem");
        $(".message-list-scroller").css("display","none");
        $(".message-detail").addClass("aparecer-mensagem");
        $(".messaging-wrapper").css("top","200px");
        setTimeout(function () { $(".panel").after("<div id='btn_voltar' style='background: #FFF;margin: 1rem 0.8rem;'><a href='#' onclick='voltarEmail()'> Voltar </a></div>")},400);
        
      });
      } 
    }

    var x = window.matchMedia("(max-device-width: 480px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes

		//Colocar nome e ID da disciplina no Breadcrumb
		if ($("body").attr("class").match(/\bcontext-course_(.[0-9]*)/)) {

				  		
		  	//insert course ID into variable
		      var courseID = $("body").attr("class").match(/\bcontext-course_(.[0-9]*)/)[1];
		    

		        $.getJSON("/api/v1/courses/" + courseID, "include[]=term", function(data) {
		          
		          $("#breadcrumbs ul li:nth-child(2) a span.ellipsible").append(" - " + data.name);

		        }); //end get jSON     

		         var menu_selecionado = $(".active").text();

		         $("#breadcrumbs ul li:nth-child(3) span.ellipsible").html(menu_selecionado);   

		    }//end check if it is a course
		});//end on document ready


});

 /***************
	Menu de ajuda EAD
	****************/

$(function() {
    $(document).on('click', '#global_nav_help_link', function(e) {
       setTimeout(function(){$("#help_tray").append("<div class='contatos-ead'>\
       	<h4>Service Desk EAD</h4>\
       	<div><img src='https://dvxfitness.com.br/icone-telefone.png'/><span>11 5085-6660</span></div>\
       	<div><img src='https://dvxfitness.com.br/icone-calendario.png'/><span>2ª à 6ª feira - 7h às 23h</span></div>\
       	<div><img src='https://dvxfitness.com.br/icone-skype.png'/><span>servicedesk.ead.espm</div></span>\
       	<div><img src='https://dvxfitness.com.br/icone-email.png'/><span><a href='mailto:servicedesk.ead@espm.br'>servicedesk.ead@espm.br</a></span></div><br>\
       	<h4>Secretaria</h4>\
       	<div><img src='https://dvxfitness.com.br/icone-telefone.png'/><span>11 5081-8200 | Opção 2</span></div>\
       	<div><img src='https://dvxfitness.com.br/icone-email.png'/><span><a href='mailto:servicedesk.ead@espm.br'>estudantes.possp-ead@espm.br</a></span></div><br>\
       	<h4>Unidade <a href='https://www.espm.br/nossos-campi/joaquim-tavora/' target='_blank' style='text-decoration:underline'>Tech</a> e <a href='https://www.espm.br/nossos-campi/itaim/' target='_blank' style='text-decoration:underline'>Itaim</a></h4>\
       	<div><h5><b>Atendimento presencial</b></h5></div>\
       	<div><img src='https://dvxfitness.com.br/icone-calendario.png'/><span>2ª à 6ª feira – das 7h às 21h45</span></div>\
       	<div><span style='padding-left: 2.3rem;'>Sábado das 8h às 16h45</span></div>\
       	<div><h5><b>Atendimento telefônico</b></h5></div>\
       	<div><img src='https://dvxfitness.com.br/icone-calendario.png'/><span>2ª à 6ª feira – das 8h às 20h</span></div>\
       	<div><span style='padding-left: 2.3rem;'>Sábado das 8h às 13h</span></div>\
       	</div>");},500);
       e.preventDefault();
    });
});


/***************
Menu "A fazer" mobile
****************/
function mostrar() {
  var element = document.querySelector(".menu-todolist");
  element.classList.toggle("mostrar-todo");
}

/***************
Botão para voltar e-mail no mobile
****************/

function voltarEmail(){
	$(".message-detail").addClass("remover-mensagem");
	$(".message-detail").removeClass("aparecer-mensagem");
	$(".message-list-scroller").addClass("aparecer-mensagem");
	$("#btn_voltar").remove();
	$(".messaging-wrapper").css("top","");
}

/***************
Traduções
****************/

$(".icon-speed-grader").text("Avaliar Atividades");
$("#global_nav_dashboard_link .menu-item__text").text("Home");
$("#global_nav_courses_link .menu-item__text").text("Disciplinas");
$("#global_nav_conversations_link .menu-item__text").text("Mensagens");
$(".section .modules").text("Materiais e Instruções");
$(".section .assignments").text("Atividades e Avaliação Final");
$(".section .context_external_tool_72").text("WebConferência - ao vivo");
$(".section .people").text("Perfil e Contatos");
$(".section .syllabus").text("Agenda e Programa");
$(".ic-Dashboard-header__title").text("Home");
$(".ic-Action-header__Primary h1:contains('Programa')").text("Programa da disciplina");
/*$(".section .modules").text("Conteúdo");
$(".section .assignments").text("Atividades");
$(".section .syllabus").text("Resumo");
$("#calendar-feed .dialog_opener").text("Conectar com calendários pessoais");*/

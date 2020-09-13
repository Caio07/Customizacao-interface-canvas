

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

/*var a = document.createElement("script");
a.type = "text/javascript";
a.src = "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/intro.min.js";
$("body").append(a);

var f = document.createElement("link");
f.href = "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css";
f.rel = "stylesheet";
$("body").append(f);

$("#right-side").attr("data-intro","Nesta área você pode ver suas tarefas pendentes!");*/

/*$(function() {
    $(document).on('load', function(e) {
       setTimeout(function(){
       	var nota_pontos = $("#final_letter_grade_text").html();
		$(".finalgrade .points_possible").append("<span>"+ nota_pontos + "</span>");
		console.log(nota_pontos)},1000);
       e.preventDefault();
    });
});*/


/***************
Aparecer nota em pontos
****************/

function checkDialog(mutations, observer) {
  const dialog = document.getElementById('final_letter_grade_text');
  if (!dialog && typeof observer === 'undefined') {
    const obs = new MutationObserver(checkDialog);
    obs.observe(document.body, {
      'childList' : true
    });
  }
  if (dialog) {
    if (typeof observer !== 'undefined') {
      observer.disconnect();
    }

    setTimeout(function () {
    var nota_pontos = $("#final_letter_grade_text").html();
    console.log(nota_pontos);
	$(".final_grade .points_possible").append("<span>"+ nota_pontos + "</span>");
	}, 500);
  }
}


/***************
Alterar Fonte do Canvas (não sendo utilizado no momento)
****************/
/*
var f = document.createElement("link");
f.href = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap";
f.rel = "stylesheet";
$("body").append(s);*/

 $(document).on("click",".gradebook-menus",function(){

 setTimeout(function(){$('[data-menu-item-id="show-notes-column"]').text('Anotações');},50);

});

  $(document).on("click","#gradebook-settings-button",function(){

 setTimeout(function(){$('.cyAHS_bGBk:contains("Avançado")').hide();},10);

});


$(document).ready(function() {
	//introJs().start();
	//$("#noanim-tab-example-tab-2").hide();


	checkDialog();


	//Adicionar Comunidades Abertas ao menu da esquerda
   $("#menu li:nth-child(5)").append("<li id='comunidades-abertas' class='ic-app-header__menu-list-item'>\
	<a id='global_nav_comunidades_link' role='button' class='ic-app-header__menu-list-link' data-track-category='Comunidades Abertas' target='_blank' data-track-label='Comunidades' href='/search/all_courses/'>\
	<div class='menu-item-icon-container' aria-hidden='true'></div><div class='menu-item__text'>Comunidades Abertas</div>\
	</a></li>");	

	//Adicionar Portal do Aluno ao menu da esquerda
   $("#menu").append("<li id='portal-do-aluno' class='ic-app-header__menu-list-item'>\
	<a id='global_nav_portal_link' role='button' class='ic-app-header__menu-list-link' data-track-category='Portal do aluno e do Professor' target='_blank' data-track-label='Portal' href='http://portal.espm.br/?'>\
	<div class='menu-item-icon-container' aria-hidden='true'></div><div class='menu-item__text'>Portal do Aluno</div>\
	</a></li>");	

      if(window.location.pathname.indexOf('/search/all_courses/') >= 0){

      	$("h1:contains('All Courses')").text("Comunidades Abertas");
      	$("#open_enrollment_only").hide();
      	$("#public_only").trigger('click');
      	$("#public_only").hide();
      	$("label[for='open_enrollment_only']").hide();
      	$("label[for='public_only']").hide();
      }

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
  if(window.location.pathname.indexOf('/grades') >= 0){
    //Se não for um admin
 	 /* if ($.inArray("admin", ENV.current_user_roles) == -1) {

    
      }*/
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
  		//ativa a opção por padrão dos alunos verem as notas reais
  		$("#only_consider_graded_assignments").trigger('click');


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

$(".section .announcements").text("Avisos");
$("#global_nav_dashboard_link .menu-item__text").text("Home");
$("#global_nav_courses_link .menu-item__text").text("Disciplinas");
$("#global_nav_conversations_link .menu-item__text").text("Mensagens");
$(".section .modules").text("Conteúdo");
$(".section .assignments").text("Atividades");
$(".section .syllabus").text("Resumo");
$(".ic-Dashboard-header__title").text("Home");
$(".ic-Action-header__Primary h1:contains('Programa')").text("Programa da disciplina");
$("#add_announcement span:not(:contains('Adicionar')):contains('Anúncio')").text("Aviso");
$(".section .context_external_tool_138").text("Status Exportação de Notas");
$("#app_container .ic-Legend").text("Você tem certeza que quer exportar as notas finais para o Campus?")
$("#content .header-bar h2:contains('Todos os cursos')").text("Todas as disciplinas");
$("#my_courses_table thead .course-list-course-title-column:contains('Curso')").text("Disciplina");
$("#past_enrollments_table thead .course-list-course-title-column:contains('Curso')").text("Disciplina");
$(".ic-Action-header__Secondary .Button:contains('Procurar Mais Cursos')").hide();
$(".section .courses").text("Disciplinas");
$(".section .people").text("Pessoas");
$(".section .files").text("Repositório");
$(".section .context_external_tool_272").text("PEA");
$(".section .context_external_tool_274").text("PEA");



//$("title:contains('Grade Sync')").text("Status da Exportação de Notas");
$("title:contains('Anúncios')").text("Avisos");
$("title:contains('Tarefas')").text("Atividades");
$("title:contains('Programa')").text("Resumo");
$("title:contains('Módulos')").text("Conteúdo");
$("title:contains('Arquivos')").text("Repositório");
$("title:contains('Blox')").text("PEA");
$("#sections_autocomplete_root button span:contains('Todas as turmas')").text("Todos os alunos");
$("#graded_assignment_fields fieldset:contains('Sincronizar para SIS')").hide();
$(".ic-DashboardCard__box__header:contains('Cursos publicados')").append("<span id='lista-disciplinas'><a href='/courses'>Histórico de disciplinas</a></span>");


$(".ellipsible:contains('Grade Sync')").text("Status da Exportação de Notas");
$(".ellipsible:contains('Anúncios')").text("Avisos");
$(".ellipsible:contains('Tarefas')").text("Atividades");
$(".ellipsible:contains('Programa')").text("Resumo");
$(".ellipsible:contains('Módulos')").text("Conteúdo");
$(".ellipsible:contains('Arquivos')").text("Repositório");
$(".submission-details-header__grade-summary").hide();
$(".ellipsible:contains('Blox')").text("PEA");

//exclui o itens Commons do menu da disciplina
$(".course-options a:contains('Commons')").css("display", "none");


$(function() {
    $(document).on('click', '#global_nav_courses_link', function(e) {
       setTimeout(function(){
        $(".tray-with-space-for-global-nav h2:contains('Cursos')").text("Disciplinas");
        $(".tray-with-space-for-global-nav span:contains('Todos os cursos')").text("Todas as disciplinas");},500);
        e.preventDefault();
    });
  });

/***************
Tradução Aba Navegação
****************/

if(window.location.pathname.indexOf('/settings') >= 0){
	var your_div_2 = document.querySelector('[aria-label="Tarefas"]');
	var text_to_change_2 = your_div_2.childNodes[0];
	text_to_change_2.nodeValue = 'Atividades';

	var your_div_3 = document.querySelector('[aria-label="Programa"]');
	var text_to_change_3 = your_div_3.childNodes[0];
	text_to_change_3.nodeValue = 'Resumo';

	var your_div_4 = document.querySelector('[aria-label="Módulos"]');
	var text_to_change_4 = your_div_4.childNodes[0];
	text_to_change_4.nodeValue = 'Conteúdo';
}


/***************
Timeline EAD (não sendo utilizada no momento)
****************/

/*
$(document).ready(function() {

	$(".events-content ol li").has("h2:contains('commons')'Semana "+ i + "')").attr('data-week', 'Semana'+i);
	if (window.location.pathname.indexOf('/courses/') >= 0) {

		  var sTemp2 = window.location.pathname.match(/\/courses\/(\d+)/),
   		      courseID = sTemp2[1];

   		  var start_date;
   		  var end_date;
   		  const oneDay = 1000 * 60 * 60 * 24;

		  $.getJSON("/api/v1/courses/" + courseID, function(data){ 

		  	start_date = data.start_at;
		  	end_date = data.end_at;

		  	var start_date_final = Date.parse(start_date);
		  	var end_date_final = Date.parse(end_date);
		  	var today = new Date();
		  	

		  	   // A day in UTC always lasts 24 hours (unlike in other time formats)
		  const end = Date.UTC(end_date_final.getFullYear(), end_date_final.getMonth(), end_date_final.getDate());
		  const start = Date.UTC(start_date_final.getFullYear(), start_date_final.getMonth(), start_date_final.getDate());
		  const current_date = Date.UTC(today.getFullYear(), today.getMonth(),today.getDate());
		  

		  var numero_semanas = Math.round(((end - start)/ oneDay)/7);
		  var semana_atual = Math.round(((current_date - start)/ oneDay)/7);
		  		

		 for (i = 1; i <= numero_semanas; i++){
		 		$(".events-ead #titulos-timeline").append("<li><a href='#0' data-week='Semana" + i + "'> Semana " + i + "</a></li>");
		 		$(".events-content ol li").has("h2:contains('commons')'Semana "+ i + "')").attr('data-week', 'Semana'+i);

		 }

		 
		 $(".cd-horizontal-timeline").prepend("<h3 id='welcome-message'>Olá x, você está na Semana " +semana_atual+ "!</h3>");
		 $('#titulos-timeline li a:first').addClass('selected');
		 //$('[data-week="Semana'+semana_atual+'"]').addClass('selected');

		  	 });


	 }*/

	/*window.onload = function(){  

	
		var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 160;

	(timelines.length > 0) && initTimeline(timelines);


		function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events-ead');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			//timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			//timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
		}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedWeek = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedWeek.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}


	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineEvents'].length; i++) { 
		    timelineComponents['timelineEvents'].eq(0).css('left', 90 +'px');
		    timelineComponents['timelineEvents'].eq(i).css('left', 90 + 80*i +'px');
		   }


	}

	function setTimelineWidth(timelineComponents, width) {
		//var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			//timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			//timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = 1400;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventWeek = event.data('week'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-week="'+ eventWeek +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var dateComp = $(this).data('date').split('/'),
				newDate = new Date(dateComp[2], dateComp[1]-1, dateComp[0]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	    
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	//Diferença de dias entre duas datas
	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
}*/

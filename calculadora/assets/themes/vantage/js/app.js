
var pricePerHour = 0;
var hours = 0;
var responses = [];
var inTransition = false;
var url = "https://pt.yeeply.com/publicar-projeto?utm_source=cuanto_PT&utm_medium=button&utm_campaign=pub";
var skills_to="";

$(window).resize(function() {
    $('#main').height($( window ).height());
});

$(document).ready(function() {
    $('#main').height($( window ).height());
    $(".question-container").hide();
    $("#reset").hide();
    $(".bar-containter").hide();                
    $(".index").show();
    $('#price').hide();

    $('#begin').click(function() {
        $(this).begin();
    });

    $('#reset').click(function() {
        document.location.reload();
    });

    responses = [];

                //PREGUNTA0
                $('.answer01').click(function() {
                    $(this).toInitialValue('question1', 60, 0, 1);
                });

                $('.answer02').click(function() {
                    $(this).toInitialValue('question1', 40, 0, 2);
                });

                $('.answer03').click(function() {
                    $(this).toInitialValue('question1', 20, 0, 3);
                });

                //PREGUNTA1
                $('.answer11').click(function() {
                    $(this).toWithValue('question2', 60, 1, 1);
                });

                $('.answer12').click(function() {
                    $(this).toWithValue('question2', 60, 1, 2);
                });

                $('.answer13').click(function() {
                    $(this).toWithValue('question2', 60, 1, 3);
                });

                $('.answer14').click(function() {
                    $(this).toWithValue('question2', 100, 1, 4);
                });

                //PREGUNTA2
                $('.answer21').click(function() {
                    $(this).toWithValue('question3', 40, 2, 1);
                });

                $('.answer22').click(function() {
                    $(this).toWithValue('question3', 120, 2, 2);
                });

                $('.answer23').click(function() {
                    $(this).toWithValue('question3', 80, 2, 3);
                });

                $('.answer24').click(function() {
                    $(this).toWithValue('question3', 0, 2, 4);
                });

                //PREGUNTA3
                $('.answer31').click(function() {
                    $(this).toWithValue('question4', 5, 3, 1);
                });

                $('.answer32').click(function() {
                    $(this).toWithValue('question4', 5, 3, 2);
                });

                $('.answer33').click(function() {
                    $(this).toWithValue('question4', 40, 3, 3);
                });

                $('.answer34').click(function() {
                    $(this).toWithValue('question4', 10, 3, 4);
                });

                //PREGUNTA4
                $('.answer41').click(function() {
                    $(this).toWithValue('question5', 40, 4, 1);
                });

                $('.answer42').click(function() {
                    $(this).toWithValue('question5', 25, 4, 2);
                });

                $('.answer43').click(function() {
                    $(this).toWithValue('question5', 0, 4, 3);
                });

                $('.answer44').click(function() {
                    $(this).toWithValue('question5', 20, 4, 4);
                });

                //PREGUNTA5
                $('.answer51').click(function() {
                    $(this).toWithValue('question6', 40, 5, 1);
                });

                $('.answer52').click(function() {
                    $(this).toWithValue('question6', 0, 5, 2);
                });

                $('.answer53').click(function() {
                    $(this).toWithValue('question6', 20, 5, 3);
                });

                //PREGUNTA6
                $('.answer61').click(function() {
                    $(this).toWithValue('question7', 40, 6, 1);
                });

                $('.answer62').click(function() {
                    $(this).toWithValue('question7', 0, 6, 2);
                });

                $('.answer63').click(function() {
                    $(this).toWithValue('question7', 20, 6, 3);
                });

                //PREGUNTA7
                $('.answer71').click(function() {
                    $(this).toWithValue('question8', 40, 7, 1);
                });

                $('.answer72').click(function() {
                    $(this).toWithValue('question8', 0, 7, 2);
                });

                $('.answer73').click(function() {
                   $(this).toWithValue('question8', 20, 7, 3);
               });

                //PREGUNTA7
                $('.answer81').click(function() {
                    $(this).toWithValue('question9', 0, 8, 1);
                });

                $('.answer82').click(function() {
                    $(this).toWithValue('question9', 20, 8, 2);
                });

                $('.answer83').click(function() {
                   $(this).toWithValue('question9', 40, 8, 3);
               });

                //PREGUNTA8
                $('.answer91').click(function() {
                    $(this).toFinalValue(0, 9, 1);
                });

                $('.answer92').click(function() {
                    $(this).toFinalValue(0, 9, 2);
                });

                $('.answer93').click(function() {
                    $(this).toFinalValue(0, 9, 3);
                });

                $('.answer94').click(function() {
                    $(this).toFinalValue(0, 9, 3);
                });

                $('.toEnd').click(function() {
                    $(this).directToFinal(0, 9, 3);
                });

            });


$.fn.extend({
    directToFinal:function(){
        responses[0] = 1;        
        responses[1] = 2;        
        responses[2] = 1;        
        responses[3] = 3;        
        responses[4] = 2;        
        responses[5] = 1;        
        responses[6] = 2;        
        responses[7] = 3; 
 //euros            $('#final-price').html("2000" + " €");
 $('#final-price').html( "R$ " + "5000");         
 $(this).toFinalValue(60,1,2);
},
begin: function() {                 
    if(!inTransition){
        inTransition = true;
        setTimeout(function() {
            $(".question-container").hide();
            $(".question0").fadeIn("slow", function() {

            });              
            inTransition = false;         
        }, 700);
    }
}
,
toInitialValue: function(to, value, q, s) {                    
    if(!inTransition){
        inTransition = true;
        $(this).find('.card').toggleClass('flipped');                                           
        responses = [];
        setTimeout(function() {
            responses[q] = s;
            $(".question-container").hide();
            $("." + to).fadeIn("slow", function() {
            });
            pricePerHour = value;
            inTransition = false;     
        }, 1700);
    }
}
,
toWithValue: function(to, value, q, s) {
    if(!inTransition){
        inTransition = true;
        $(this).find('.card').toggleClass('flipped');
        setTimeout(function() {
            $(".question-container").hide();
            $("." + to).fadeIn("slow", function() {
            });
            $('#price').show();
            hours += value;
            responses[q] = s;
            $(".bar-containter").show();
            var w = (hours * 100) / 1000;
            if (w > 88)
                w = 88;
            $('.bar').css('width', w + '%');
                   //euros  $('#price').html((hours * pricePerHour) + " €");
                   conver=3.4
                   $('#price').html("R$ " + (conver * hours * pricePerHour));
                   $("html, body").animate({scrollTop: 0}, "slow");
                   inTransition = false;
               }, 1700);
    }
}
,
toFinalValue: function(value, q, s) {
    if(!inTransition){
        inTransition = true;
        $(this).find('.card').toggleClass('flipped');
        setTimeout(function() {
            $.ajax({
                url: "index.html",
                context: document.body
            }).done(function() {
                $( this ).addClass( "done" );
                $(".question-container").hide();
                $(".final").fadeIn("slow", function() {
                    hours += value;
                    responses[q] = s;
                    var w = (hours * 100) / 700;
                    if (w > 88)
                        w = 88;

                    if(responses[1]==1){skills_to="skills_to=2&type_to=3"}
                        if(responses[1]==2){skills_to="skills_to=1&type_to=2"}
                            if(responses[1]==3){skills_to="skills_to=3&type_to=4"}

//                                    var budget_to = 0;
//                                    if((hours * pricePerHour) < 2000){
//                                        budget_to = 1999;
//                                    }
//                                    if((hours * pricePerHour) >= 2000 && (hours * pricePerHour) < 5000){
//                                        budget_to = 4999;
//                                    }
//                                    if((hours * pricePerHour) >= 5000 && (hours * pricePerHour) < 10000){
//                                        budget_to = 9999;
//                                    }
//                                    if((hours * pricePerHour) >= 10000){
//                                        budget_to = 10000;
//                                    }

url = url; <!-- (Luis) he quitado esto +skills_to+"&budget_to="+budget_to; -->
$('#toYeeply').attr('href',url);

$('.bar').css('width', w + '%');
$(".bar-containter").hide();
            //euros                 $('#price').html((hours * pricePerHour) + " €");

            var questionAnswer = '';
            var conver = 3.4;
            $('#price').html("R$ " + (conver * hours * pricePerHour));
            $("html, body").animate({scrollTop: 0}, "slow");
            $(".final-price").html($('#price').html());
            $.each(responses, function(index, value) {
                var html = $('#responses').html();
                var text = $('.answer' + index + '' + value + ' p.text').text();
                var ask = $('.question' + index + ' ' + '.question').text();
                html += "<div rel='tooltip' title='" + ask + "' class='answer" + index + "" + value + " response-container'><div class='icon icon-answer"+ index+ "" + value + " response-icon'></div><p>" + text + "</p></div>";
                $('#responses').html(html);
                $("#reset").show();
                $('#price').show();

                questionAnswer += "&q"+index+"=a"+value;

            });

            var budget_to = (hours * pricePerHour);
//                                    url = url; <!-- (Luis)antes era url = url+skills_to+"&budget_to="+budget_to -->

<!-- Cuando se haya subido el sprint 21 hay que descomentar las dos siguiente lineas -->
//                                    url = url+"&bg="+budget_to;
//                                    url = url+questionAnswer;
$('#toYeeply').attr('href',url);

$('.addthis_toolbox').show();
initTooltips();
});
});

}, 1700);
}
}
});

            //TOOLTIPS

            function initTooltips() {
                var targets = $('[rel~=tooltip]'),
                target  = false,
                tooltip = false,
                title   = false;

                targets.bind('mouseenter', function()
                {
                    target  = $(this);
                    tip     = target.attr('title');
                    tooltip = $('<div id="tooltip"></div>');

                    if (!tip || tip == '')
                        return false;

                    target.removeAttr('title');
                    tooltip.css('opacity', 0)
                    .html(tip)
                    .appendTo('body');



                    var init_tooltip = function()
                    {
                        $("#tooltip").hide();
                        if ($(window).width() < tooltip.outerWidth() * 1.5)
                            tooltip.css('max-width', $(window).width() / 2);
                        else
                            tooltip.css('max-width', 340);

                        var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                        pos_top  = target.offset().top - tooltip.outerHeight() - 20;

                        if (pos_left < 0)
                        {
                            pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                            tooltip.addClass('left');
                        }
                        else
                            tooltip.removeClass('left');

                        if (pos_left + tooltip.outerWidth() > $(window).width())
                        {
                            pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                            tooltip.addClass('right');
                        }
                        else
                            tooltip.removeClass('right');

                        if (pos_top < 0)
                        {
                            var pos_top  = target.offset().top + target.outerHeight();
                            tooltip.addClass('top');
                        }
                        else
                            tooltip.removeClass('top');

                        tooltip.css({left: pos_left, top: pos_top}).animate({top: '+=10', opacity: 1}, 50);             
                        $("#tooltip").fadeIn("slow", function() {});
                    };

                    init_tooltip();
                    $(window).resize(init_tooltip);


                    var remove_tooltip = function()
                    {
                        tooltip.animate({top: '-=10', opacity: 0}, 50, function()
                        {
                            $(this).remove();
                        });

                        target.attr('title', tip);
                        $("#tooltip").hide();
                    };

                    target.bind('mouseleave', remove_tooltip);
                    tooltip.bind('click', remove_tooltip);
                });
}
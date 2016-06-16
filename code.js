//question réponse
(function() {
  var questions = [{
    question: "quelle est la réponse à la grande question sur la vie l'univers et le reste?",
    choices: ['42', 'Obiwan Kenobi', 'lorem ipsum', 'un bisounours'],
    correctAnswer: 0
  }, {
    question: "demain je serai où?",
    choices: ['Obiwan Kenobi', 'ici', 'si je réponds je devrai vous faire disparaitre', 'dans les 9 cercles de l enfer'],
    correctAnswer: 2
  }, {
    question: "Au maximum, dans combien de mètres de bandelettes étaient entourées certaines momies ?",
    choices: ['25m', '250m', '2500m', '25000m'],
    correctAnswer: 2
  }, {
    question: "qui est Voltaire?",
    choices: ['une tanche', 'un philosophe', 'le père du volt', 'Obiwan Kenobi'],
    correctAnswer: 1
  }, {
    question: "Si tu gobes une noix de coco...",
    choices: [' tu fais confiance à ton anus','toujours Obiwan Kenobi','euh!...', 'vous pouvez repeter la question?'],
    correctAnswer: 0
  },{
    question: " t'es une fille, pas vrai ?",
    choices: ['pourquoi tu as un examen de biologie aujourd hui?', 'pas sûr', 'non', 'oui'],
    correctAnswer: 0
  },{
    question: "Comment garder la tête haute à la prochaine réunion?",
    choices: ['mettre une minerve','sortir la hache', 'demain est un autre jour','Obiwan Kenobi forever' ],
    correctAnswer: 0
  },{
    question: "il n existe que deux choses infinies  l univers et la bétise humaine...",
    choices: ['mais pour l univers je n en ai pas encore la certitude','c est pas faux','et la marmotte...','Obiwan Kenobi is back'],
    correctAnswer: 0
  },{
    question: "comment on fait les bébés?",
    choices: ['tu vois cette bouteille de lait...','demande à ta mère' ,'payes d abord','just do it'  ],
    correctAnswer: 0
  },{
    question: "au résultat du quizz allez vous trucider l auteur des questions?",
    choices: ['oui','avec une hache', 'il ne faut même pas poser la question', 'non'],
    correctAnswer: 0
  }];
//parametrage des variables
  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');
  var choices =[];

//création des événements bouton next
  displayNext();

  $('#next').on('click', function (e) {
    e.preventDefault();


    if(quiz.is(':animated')) {
      return false
    };
    choose();

//boite dial si on ne repond pas elle s'affiche
    if (isNaN(selections[questionCounter])) {
      alert('veuillez répondre');
    } else {
      questionCounter++;
      displayNext();
    }
  });

//creation evenements  bouton prev
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

//creation evenements  bouton start
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

//passe à la question suivante
  $('.button').on('mouseenter', function () {
    $(this).addClass('');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

//titre + changement des questions
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creation question avec valeur
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  function choose(){
    selections[questionCounter] = +$('input[name="answer"]:checked').val();


    if (selections[questionCounter] == questions[questionCounter].correctAnswer){
      choices[questionCounter] = "<p class='correct'>" + questions[questionCounter].choices[$('input[name="answer"]:checked').val()]+'</p>';
    }
    else {
      choices[questionCounter] = "<p class='error'>" + questions[questionCounter].choices[$('input[name="answer"]:checked').val()]+'</p>';
    }
  }


  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }


        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  // Affichage du score et reponses
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++){
      if (selections[i] == questions[i].correctAnswer){
        numCorrect++;
      }
    }
    score.append('Vous avez ' + numCorrect + ' réponse sur ' +
    questions.length + ' de correcte' + choices.join(' '));
    return score;
  }
})();

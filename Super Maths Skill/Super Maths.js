  // 1. Text strings =====================================================================================================
  //    Modify these strings and messages to change the behavior of your Lambda function

  const languageStrings = {
      'en': {
          'translation': {
              'WELCOME' : "Welcome to Super Maths skill. ",
              'TITLE'   : "Supe Maths",
              'HELP'    : "In this game, You will get maths problem to solve, We will start from basics and slowly increase the difficulty level. Are you ready to start?.",
              'STOP'    : "Okay, play again soon.",
              'VERSION' : "Version: 2.03v"
          }
      }
      // , 'de-DE': { 'translation' : { 'WELCOME'   : "Guten Tag etc." } }
  };
  const data = {
    // TODO: Replace this data with your own.
      "Welcome" :
      [
          '<say-as interpret-as="interjection">Hello</say-as>.',
          '<say-as interpret-as="interjection">Howdy</say-as>.',
          '<say-as interpret-as="interjection">Welcome Back</say-as>.',
          '<say-as interpret-as="interjection">Good day</say-as>.',
          '<say-as interpret-as="interjection">Glad to see you again</say-as>.'
          ],
      "wmsg" :
      [
          'Hello. ',
          'Howdy. ',
          'Welcome Back. ',
          'Good day. ',
          'Glad to see you again. '
          ],
      "congrats" :
      [
          '<say-as interpret-as="interjection">Awesome</say-as>.',
          '<say-as interpret-as="interjection">fantastic</say-as>.',
          '<say-as interpret-as="interjection">hurray</say-as>.',
          '<say-as interpret-as="interjection">well done</say-as>.',
          '<say-as interpret-as="interjection">woo hoo</say-as>.',
          '<say-as interpret-as="interjection">yippee</say-as>.',
          ],
      "congratsmsg" :
      [
          'Awesome',
          'Fantastic',
          'Hurray',
          'well done',
          'woo hoo',
          'Yippee nice '
          ],
      "nextlevel" :
      [
          ' You have made it to level ',
          ' Next level is ',
          ' Your next challenge is level ',
          ' You moved to level ',
          ' You have reached level '
          ]
  };
  const challenges = {
      "questions" :
      [
        //level 1 starts here.
        
          "1+1",
          "1+2",
          "3 minus 1",
          "6+5",
          "10 minus 6",
          "11 minus 7",
          "8+5",
          "7+8",
          "8 minus 3 +4",
          "1+5+1",
          
          //level 2 starts here
          
          "10+20",
          "15+17",
          "20+5+8",
          "17 minus 2+14",
          "25+25",
          "25 minus 20",
          "25+20",
          "20+15 minus 5",
          "26 minus 2 ",
          "29 + 4 minus 3",
          
          //level 3 starts here
          
          "1*1",
          "10*10",
          "4*4",
          "4*4 minus 1",
          "6*2",
          "8*8 minus 4",
          "9 + 7*3",
          "5*5 +5",
          "7*7",
          "8*7 +4",
          
          //level 4 start here
          
          "1 divided by 9",
          "9 divided by 9",
          "99 divided by 1",
          "2 divided by 2",
          "1*2 divided by 2",
          "5 divided by 5",
          "7 divided by 7",
          "4 divided by 2",
          "11*5",
          "99 divided by 11"
          ],
          "answers" :
          [
            //level 1
            
            "2",
            "3",
            "2",
            "11",
            "4",
            "4",
            "13",
            "15",
            "9",
            "7",
            
            //level 2
            
            "30",
            "32",
            "33",
            "29",
            "50",
            "5",
            "45",
            "30",
            "24",
            "30",
            
            //level 3
            
            "1",
            "100",
            "16",
            "15",
            "12",
            "60",
            "30",
            "30",
            "49",
            "60",
            
            //level 4
            
          "1",
          "1",
          "99",
          "1",
          "1",
          "1",
          "1",
          "2",
          "55",
          "9"
            
            ],
            "qdisplay" :
            [
              //level 1 starts here.
        
          "1 + 1",
          "1 + 2",
          "3 - 1",
          "6 + 5",
          "10 - 6",
          "11 - 7",
          "8 + 5",
          "7 + 8",
          "8 - 3 + 4",
          "1 + 5 + 1",
          
          //level 2 starts here
          
          "10 + 20",
          "15 + 17",
          "20 + 5 + 8",
          "17 - 2 + 14",
          "25 + 25",
          "25 - 20",
          "25 + 20",
          "20 + 15 - 5",
          "26 - 2",
          "29 + 4 - 3",
          
          //level 3 starts here
          
          "1 * 1",
          "10 * 10",
          "4 * 4",
          "4 * 4 - 1",
          "6 * 2",
          "8 * 8 - 4",
          "9 + 7 * 3",
          "5 * 5 + 5",
          "7 * 7",
          "8 * 7 + 4",
          
          //level 4 start here
          
          "1/9",
          "9/9",
          "99/1",
          "2/2",
          "1*2/2",
          "5/5",
          "7/7",
          "4/2",
          "11*5",
          "99/11"
              ]
            
  };
  const welcomeCardImg = {
      smallImageUrl: '',
      largeImageUrl: ''
  };
  // 2. Skill Code =======================================================================================================

  const Alexa = require('alexa-sdk');
  const AWS = require('aws-sdk');  // this is defined to enable a DynamoDB connection from local testing
  const AWSregion = 'us-east-1';   // eu-west-1
  var persistenceEnabled;
  AWS.config.update({
      region: AWSregion
  });

  exports.handler = function(event, context, callback) {
      var alexa = Alexa.handler(event, context);
      // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
      alexa.dynamoDBTableName = 'Super_maths'; // creates new table for session.attributes
      if (alexa.dynamoDBTableName == 'Super_maths' ){
        persistenceEnabled=true;
      } else {
        persistenceEnabled=false;
      }
      alexa.resources = languageStrings;
      alexa.registerHandlers(handlers);
      alexa.execute();

  };

  var say ="",display="";
  var highScore, currentScore, level, i, l, q, back=0, newp;
  
  const handlers = {
      'LaunchRequest': function () {

          this.attributes['highScore'];
          this.attributes['answer'];
          this.attributes['level'];
          say="";
          level =1;
          highScore=0;
          currentScore=0;
          newp=1;
          
          if (!this.attributes['highScore'] ) {
            
            back=newp;
              say = this.t('WELCOME') + ' ' + this.t('HELP');

              this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME') +"\n" + this.t('HELP'), welcomeCardImg);
          } 
          else if(back==1){
            say = 'Here are your Options. 1. Continue your previous game. 2. Start a new game. 3. reset. 4. Updates to know about updates. 5. To send us feedback.';
              display = "High score = " + this.attributes['highScore'] + "\nPlease select your option.\n 1. Continue your previous game.\n 2. start new game.\n 3. Reset\n 4. Updates\n 5. Feedback. ";

              this.response.cardRenderer(this.t('TITLE'), display);
          }
          else {
              back=1;
            highScore = this.attributes['highScore'];
            currentScore=highScore;
            
            level = this.attributes['level'];
            
            i = randomSelect(5);
              say = data.Welcome[i] + ' Your High Score is '
                  + this.attributes['highScore']
                  + '. What you want to do? Here are your Options. 1. Continue your previous game. 2. Start a new game. 3. reset. 4. Updates to know about updates. 5. To send us feedback.';
              display = "High score = " + this.attributes['highScore'] + "\n" + data.wmsg[i] + "\nPlease select your option.\n 1. Continue your previous game.\n 2. start new game.\n 3. Reset\n 4. Updates\n 5. Feedback. ";

              this.response.cardRenderer(this.t('TITLE'), display);
          }
          this.response.speak(say).listen(say);
          this.emit(':responseReady');
      },
      
      'PlayIntent': function () {
          
          i=randomSelect(6);
          var j=randomSelect(5);
          this.attributes['level']=level;
        if(level==1){
          q=0;
          l=1;
          say = "Level 1. In this level we will practise with some easy addition and subtraction problems.\nQuestion 1.  " + challenges.questions[q];
          display= "Level 1. In this level we will practise with some easy addition and subtraction problems.\n No. | Question \n1.       " + challenges.qdisplay[q];
          this.response.cardRenderer('Your score = ' + currentScore, "\n" + display);
        }
       else if(level==2){
          
          q=11;
          l=1;
          say = data.congrats[i] + " " + data.nextlevel[j] + " 2, Tighten up your seat belt. Question 1. "+ challenges.questions[q];
          display= " Level 2: Tighten up your seat belt.\n No. | Question \n1.       " + challenges.qdisplay[q];
          this.response.cardRenderer('Your score = ' + currentScore, "\n" + data.congratsmsg[i] +"\n"+ display);
        }
        else if(level==3){
          
          q=21;
          l=1;
          say = data.congrats[i] + " " + data.nextlevel[j] + " 3, Tighten up your seat belt. Question 1. "+ challenges.questions[q];
          display= " Level 3: Let\'s go to drive. \n No. | Question \n1.       " + challenges.qdisplay[q];
          this.response.cardRenderer('Your score = ' + currentScore, "\n" + data.congratsmsg[i] +"\n"+display);
        }
        else if(level==4){
          
          q=31;
          l=1;
          say = data.congrats[i] + " " + data.nextlevel[j] + " 4, Let's go up for division of Numbers. Question 1. "+ challenges.questions[q];
          display= "Level 4: Let\'s go up for division of Numbers. \n No. | Question \n1.       " + challenges.qdisplay[q];
          this.response.cardRenderer('Your score = ' + currentScore, "\n" + data.congratsmsg[i] + "\n" + display);
        }
        else{
            this.emit('CompletedIntent');
        }
        
        this.response.speak(say).listen(say);
        
        this.emit(':responseReady');
      },
      
      'BlankIntent': function() {
        
        this.response.cardRenderer(this.t('TITLE'), "\n No. | Question \n" + l + ".       " + challenges.qdisplay[q]);
        this.response.speak("Please tell me your answer ? Your question is "+ challenges.questions[q]).listen("Please tell me your answer?");
        
        this.emit(':responseReady');
      },
      
      'UpdateIntent': function () {
        back=newp;
        newp=2;
        display="1. Updated Questions display.\n 2. Updated the voice UI.\n3. Added Column to questions. \n4. Added level 4. \n5. Improved Voice Navigation. \n6. Added back navigation in menu."
        +"\n Ask back to go back.";
        
        say="Number 1. Updated Questions on display. Number 2. Updated the voice UI. Number 3. Added Column to questions. Number 4. level 4. Number 5. Improved Voice Navigation. 6. Added back navigation. "
        +"\n To back to previous menu just say back.";
        
        this.response.cardRenderer(this.t('VERSION'), display);
        this.response.speak(say).listen(say);
        
        this.emit(':responseReady');
      },
      
      'BackIntent': function () {
        if(back==1)
        {
          this.emit('LaunchRequest');
        }
        else if(back==2)
        {
          this.emit('UpdateIntent');
        }
        else
        this.emit('FeedbackIntent');
        
      },
      
      'FeedbackIntent': function () {
        back=newp;
        newp=3;
        
        display="Please send me feedback at: vvksindia@gmail.com. "
        +"\n Ask me back to back to previous menu.";
        
        say='Connect directly to me. Please drop me an email at <say-as interpret-as="spell-out">vvksindia@gmail.com</say-as>. for any kind of update. '
        +"\nJust ask back to to go back.";
        
        this.response.cardRenderer(this.t('VERSION'), display);
        this.response.speak(say).listen(say);
        
        this.emit(':responseReady');
      },
      
      'CompletedIntent': function () {
          
        highScore = incrementScore.call(this, currentScore);
        
        i=randomSelect(6);
        say += data.congrats[i] + ". you have completed the game! Your Highscore is " + highScore + "bye bye.";
        display += data.congratsmsg[i] + ". you have completed the game! Your Highscore is " + highScore + "bye bye.";
        
        this.response.cardRenderer(this.t('TITLE'), display);
        this.response.speak(say).cardRenderer(this.t('TITLE'), data.congratsmsg[i] + "\n You have completed all the challenges! New mission coming soon.", welcomeCardImg); 
        this.emit(':responseReady');
      },
      
      'StartPlaying': function () {
        
        level = 1;
        highScore=0;
        currentScore=0;
        this.emit('PlayIntent');
      },
      
      'ContinuePlaying':function(){
        
        level = this.attributes['level'];
        highScore = this.attributes['highScore'];
        currentScore=highScore;
        this.emit('PlayIntent');
      }, 
      
      'AMAZON.YesIntent': function () {
          this.emit('PlayIntent');
      },
      
      'AMAZON.NoIntent': function () {
          this.response.speak('Okay, see you next time!');
          this.emit(':responseReady');
      },
      
      'AMAZON.PauseIntent': function () {

          var say = "If you pause, you'll lose your progress. Do you want to go to the next step?";

          // cross-session persistence is enabled
          if (persistenceEnabled){
            say = 'Okay, Saving your score.';
          }
          this.response.speak(say);
          this.emit(':responseReady');
      },
      
      'QuestionIntent': function () {
        this.attributes['answer'] = this.event.request.intent.slots.answer.value;
        var answer=this.attributes['answer'];
        
        i=randomSelect(6);
        
        if(answer === challenges.answers[q])
        {
          q++;
          l++;
          currentScore++;
          if(l==11)
          {
            level++;
            
            l=1;
            this.emit('PlayIntent');
          }
          else{
            say=data.congrats[i]+" You are right. Next Question. " + challenges.questions[q];
            display="\n No. | Question \n" + l + ".       " + challenges.qdisplay[q];
            
          this.response.cardRenderer(this.t('TITLE'),"Your score is: " + currentScore + "\n"+ display );
        }
        }
        else{
          say = 'I\'m Sorry. <amazon:effect name="whispered">Your answer is incorrect.</amazon:effect>. Try again.\n'+ challenges.questions[q];
          this.response.cardRenderer(this.t('TITLE'), "Please answer again. \n No. | Question \n" + l + ".       " + challenges.qdisplay[q]);
        }
        
        this.response.speak(say).listen("Please answer or ask to stop.");
        this.emit(':responseReady');
      },
      
      'AMAZON.HelpIntent': function () {
        say = "Welcome to Super maths game, this game is designed to improve your mathematics skill, and increase your command over numbers."
        + "The main goal is to fasten your computation skills step by step, In each level the difficulty of your problems increase .";
          if (!this.attributes['highScore']) {  // new session
          this.response.cardRenderer(this.t('TITLE'),say);
          this.response.speak(say + "Would you like to Start playing?").listen("Do you want to start a new game?");
          } else {
              highScore = this.attributes['highScore'];
              say += 'Your high score is ' + highScore + ' of the ' + this.t('TITLE') + ' game. ';
              var reprompt = 'Would you like to start a new game?';
              this.response.cardRenderer(this.t('TITLE'), "Highscore = " +highScore +"\n"+ say);
              this.response.speak(say + reprompt).listen(reprompt);
          }
          this.emit(':responseReady');
      },
      
      'AMAZON.StartOverIntent': function () {
          delete this.attributes['highScore'];
          delete this.attributes['level'];
          this.emit('LaunchRequest');
      },
      
      'AMAZON.CancelIntent': function () {
          this.response.speak(this.t('STOP'));
          this.emit(':responseReady');
      },
      
      'AMAZON.StopIntent': function () {
          this.emit('SessionEndedRequest');
      },
      
      'SessionEndedRequest': function () {
          highScore = incrementScore.call(this, currentScore);
          console.log('session ended!');
          this.response.speak('Your score is '+ currentScore + '. ' + '<say-as interpret-as="interjection">bye bye</say-as>');
          this.emit(':responseReady');
      }
  };

  //    END of Intent Handlers {} ========================================================================================
  // 3. Helper Function  =================================================================================================

  function incrementScore(currentScore){ 
      if(!this.attributes['highScore'])
      {
          this.attributes['highScore'] = currentScore;
      }
      else if(this.attributes['highScore'] < currentScore)
      {
        this.attributes['highScore'] = currentScore;
      }
      return this.attributes['highScore'];
  }
  
  function randomSelect(i){
    return (Math.floor(Math.random()*i));
  }
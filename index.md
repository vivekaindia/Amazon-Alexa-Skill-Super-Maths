## Welcome to Amazon Alexa Super Maths Skill

The game will help your kids to learn and grow. It is based on the concept to learn faster calculation by solving maths fast. Specially desgined to take the development over assistance technology to newer level.

The repository contains all the jason file and js files that you can edit as per your requirements. The first version of skill was published in March 2018. And the intent model is carried from older version performing the intent scheme to update according to amazon's policy.

### General Logic code

It includes the comparision of different types two strings, The input received from the user and the correct answer, once the user speaks the answer the system matchs the answer with index in the collection(answer). If the answer in the index is not matched then it's incorrect.

```markdown
Logic codes that needs to be followed.

#Collection of data

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


*****Explaination*****

The Collection contain different set of utterances and nounces that Alexa uses during starting and greeting the user,
It also contains the question and answers in the collection set and respective index.
The Collection help Us to make Alexa flexible and dynamic with her greetings and welcome notes. 


# Set Up DynamoDB with the Skill attributes

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

*****Explanation*****

This helps us to set up dynamodb table if the user invokes the skill for first by disabling the persistance.
 i.e persistanceEnabled=false;
IF the table already exists this uses the persistanceEnabled to Ture and creates a new table in the database.


# Play Intent

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

*****Explanation*****

These Set of code contains declaration of different levels and the start points of these levels in the game.
This Intent is invoked when the user agrees or request the skill to start playing.
Smaple uttreances are stored in Voice User Interface Section.


# BlankIntent

 'BlankIntent': function() {
        
        this.response.cardRenderer(this.t('TITLE'), "\n No. | Question \n" + l + ".       " + challenges.qdisplay[q]);
        this.response.speak("Please tell me your answer ? Your question is "+ challenges.questions[q]).listen("Please tell me your answer?");
        
        this.emit(':responseReady');
      },

*****Explanation*****

Sometimes the Users utterance can invoke the answer intent but with no actual answer this blank intent sets up the request to answer again.
 

## Complete Intent

   'CompletedIntent': function () {
          
        highScore = incrementScore.call(this, currentScore);
        
        i=randomSelect(6);
        say += data.congrats[i] + ". you have completed the game! Your Highscore is " + highScore + "bye bye.";
        display += data.congratsmsg[i] + ". you have completed the game! Your Highscore is " + highScore + "bye bye.";
        
        this.response.cardRenderer(this.t('TITLE'), display);
        this.response.speak(say).cardRenderer(this.t('TITLE'), data.congratsmsg[i] + "\n You have completed all the challenges! New mission coming soon.", welcomeCardImg); 
        this.emit(':responseReady');
      },

## Start Intent

   'StartPlaying': function () {
        
        level = 1;
        highScore=0;
        currentScore=0;
        this.emit('PlayIntent');
      },

## Continue Intent

      'ContinuePlaying':function(){
        
        level = this.attributes['level'];
        highScore = this.attributes['highScore'];
        currentScore=highScore;
        this.emit('PlayIntent');
      }, 

## Question Intent

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
  
### Support or Contact

For more skills chcek my github repository [link] (https://github.com/vivekaindia) or contact me at vvksindia@gmail.com 

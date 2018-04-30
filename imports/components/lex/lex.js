import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './lex.html';


export default angular.module('lexApp', [angularMeteor])
.controller('MainCtrl', ['$scope', function($scope) {

    $scope.go = function() {

        alert("clicked");
        
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:1c4c331e-6318-4fe3-9322-90bf0db1c53f',
        });

        // taken from the other inclass example
        config = {
            lexConfig: { 
                    botAlias: '$LATEST',
                    botName: 'QnABot_QnABot_AoneeightENRfive'
            }
        };
  
        conversation = new LexAudio.conversation(config, function (state) {
            message.textContent = state + '...';
            if (state === 'Listening') {
                waveform.prepCanvas();
            }
            if (state === 'Sending') {
                waveform.clearCanvas();
            }
        }, function (data) {
            console.log('Transcript: ', data.inputTranscript, ", Response: ", data.message);
        }, function (error) {
            message.textContent = error;
        }, function (timeDomain, bufferLength) {
            waveform.visualizeAudioBuffer(timeDomain, bufferLength);
        });
        conversation.advanceConversation();

    };


  }]);
  /*
.directive('chatBot', function() {
    function link(scope, element) {
        var waveform = window.Waveform();
        var message = angular.element(document.getElementById('message'));
        var config, conversation;
        $scope.textContent = 'Passive';

        function executeBot() {
            
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-east-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:1c4c331e-6318-4fe3-9322-90bf0db1c53f',
            });
    
            // taken from the other inclass example
            config = {
                lexConfig: { 
                        botAlias: '$LATEST',
                        botName: 'QnABot_QnABot_AoneeightENRfive'
                }
            };
        
            conversation = new LexAudio.conversation(config, function (state) {
                message.textContent = state + '...';
                if (state === 'Listening') {
                    waveform.prepCanvas();
                }
                if (state === 'Sending') {
                    waveform.clearCanvas();
                }
            }, function (data) {
                console.log('Transcript: ', data.inputTranscript, ", Response: ", data.message);
            }, function (error) {
                message.textContent = error;
            }, function (timeDomain, bufferLength) {
                waveform.visualizeAudioBuffer(timeDomain, bufferLength);
            });
            conversation.advanceConversation();
        };
    }
    return { 
        link: link,
        restrict: 'E'
    }
  });*/
   /* .component('chartsApp', {
      templateUrl: 'imports/components/charts/chart.html',
      controller: ['$scope', '$http', d3Ctrl]
    });*/
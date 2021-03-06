angular.module('app.services', [])

.factory('dataService', function () {

    var words = "Lorem ipsum dolor sit amet consectetur adipiscing elit Curabitur nec vulputate justo Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ullamcorper sapien a ante aliquam ut fringilla libero adipiscing Fusce quis lectus lectus et cursus risus Maecenas ullamcorper erat eu tortor iaculis eget ultricies enim imperdiet Cras rutrum sagittis dignissim Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos Donec hendrerit tortor commodo malesuada adipiscing lacus massa rhoncus mauris lacinia bibendum lacus odio quis libero Mauris sollicitudin est eu dui dapibus commodo Donec convallis tincidunt augue quis fringilla neque malesuada ut Nunc faucibus lorem vitae risus vulputate ut ullamcorper sapien egestas Ut malesuada metus et ante blandit vel dapibus nisl tincidunt Nunc eu turpis magna vitae vulputate risus Nam in turpis ante Vestibulum elementum vulputate arcu mattis fermentum Aenean tincidunt ultricies mi a rhoncus ante iaculis ac Fusce ligula tellus suscipit nec ultricies ut pellentesque in eros Curabitur eleifend lorem ut arcu scelerisque blandit Suspendisse nunc lorem fringilla eu lobortis sit amet convallis in tellus Phasellus urna metus vestibulum et sodales et luctus a libero Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos himenaeos Nulla in dui eget libero imperdiet dignissim Integer vel varius leo Fusce nec tortor at augue facilisis porta Etiam nec commodo quam Curabitur sit amet orci in lectus volutpat sagittis Proin non mollis nunc Ut nulla elit bibendum a consequat non vestibulum sed purus Mauris sit amet enim tellus Curabitur sed nunc eget felis adipiscing posuere Ut semper ultrices venenatis Mauris semper euismod diam eu feugiat nisi bibendum ut Donec cursus placerat tincidunt Donec porttitor diam a dictum porta enim mi tempus nisl gravida egestas ligula felis ac magna Nulla et quam mattis ante ornare porta et ac augue Ut imperdiet venenatis";
    var wordsArray = words.split(" ");

    var sentenceArray = [];
    for (var i = 0; i < 50; i++) {
        var question = wordsArray.slice(i * 6, (i * 6 + 5)).join(" ");
        sentenceArray.push(
            {
                id: i,
                question: question,
                answer: -1,
                disabled: true
            }
        );
    }

    sentenceArray.dataToSubmit = function () {
        var newData = [];
        for (var i = 0; i < this.length; i++) {
            newData.push(
                [this[i].id, this[i].answer]
            );
        };
        return newData;
    };

    return sentenceArray;
})

.factory('messageService', function ($timeout) {

    var settings = {
        publish_key: 'pub-c-34d13177-c7ef-42cb-a475-6163ef5cf173',
        subscribe_key: 'sub-c-2495c260-990f-11e2-ac20-12313f022c90',
        channel: 'c1',
        waitForChannelMs: 100
    };

    var channelOpen = false;

    var pubnub = PUBNUB.init({
        publish_key: settings.publish_key,
        subscribe_key: settings.subscribe_key
    });

    var send = function (message) {
        (function waitForChannelOpenFn() {
            if (channelOpen) {
                pubnub.publish({
                    channel: settings.channel,
                    message: message
                })
            } else {
                $timeout(waitForChannelOpenFn, settings.waitForChannelMs);
            }
        })();
    };

    var listen = function (listener) {
        pubnub.subscribe({
            channel: settings.channel,
            message: function (msg) { listener(msg) },
            connect: function () { channelOpen = true; }
        })

    };

    return {
        send: send,
        listen: listen
    };
});



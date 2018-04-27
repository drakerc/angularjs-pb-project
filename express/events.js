"use strict";
var express = require('express');
var router = express.Router();

//Periods: 1: 8-10 2: 10-12, 3: 12-14, 4: 14-16, 5: 16-18, 6: 18-20, 7: 20-22, 8: 22-24

var events = [
    {id: 1, title: 'Zrobic zakupy spozywcze', category: 1, date: '04/22/2018', period: 1, person: 1},
];


//Routes will go here
module.exports = router;

router.get('/', function(req, res){
    res.json(events);
});

router.get('/:id([0-9])', function(req, res){
    var currEvent = events.filter(function(event){
        if(event.id === req.params.id){
            return true;
        }
    });
    if(currEvent.length === 1){
        res.json(currEvent[0]);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.get('/personsPlan/:id([0-9])', function(req, res){
    var currEvent = events.filter(function(event){
        if(event.person.toString() === req.params.id){
            return true;
        }
    });
    if(currEvent.length >= 1){
        res.json(currEvent);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});


router.get('/dayPlan/:date', function(req, res){
    var currEvent = events.filter(function(event) {
        if(event.date === req.params.date){
            return true;
        }
    });
    if(currEvent.length >= 1){
        res.json(currEvent);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});


router.post('/', function(req, res) {
    console.log(req.body)
    if (!req.body.title || !req.body.category || !req.body.date || !req.body.person || !req.body.period) {
        res.status(400);
        res.json({message: "Bad Request posting"});
    } else {
        var newId = events[events.length-1].id+1;
        events.push({
            id: newId,
            title: req.body.title,
            category: req.body.category,
            date: req.body.date,
            period: req.body.period,
            person: req.body.person,
        });
        res.json({message: "New event created.", location: "/events/" + newId});
    }
});

router.put('/:id', function(req, res){
    if((!req.body.title || !req.body.category || !req.body.date || !req.body.person || !req.body.period || !req.params.id.toString().match(/^[0-9]$/g))) {
        res.status(400);
        res.json({message: "Bad Request put"});
    } else {
        var updateIndex = events.map(function(event){
            return event.id;
        }).indexOf(parseInt(req.params.id));

        if(updateIndex === -1){
            return;
        } else {
            events[updateIndex].title= req.body.title;
            events[updateIndex].category = req.body.category;
            events[updateIndex].date = req.body.date;
            events[updateIndex].person = req.body.person;
            events[updateIndex].period = req.body.period;
            res.json({message: "Event id " + req.params.id + " updated.",
                location: "/events/" + req.params.id});
        }
    }
});

router.delete('/:id', function(req, res){
    var removeIndex = events.map(function(event){
        return event.id;
    }).indexOf(parseInt(req.params.id));

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        events.splice(removeIndex, 1);
        res.send({message: "Event id " + req.params.id + " removed."});
    }
});


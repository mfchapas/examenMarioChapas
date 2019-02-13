var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

var fileModel = require('./jsonModel');
var examen = null;

var empleado = {
    'RTN': '',
    'Empresa': '',
    'Correo':null,
    'Rubro':null,
    'Direccion':'',
    'Telefono':''
};

router.get('/', function(req, res, next){
    if(!examen){
        fileModel.read(function(err, fileexamen){
            if(err){
                console.log(err);
                examen = [];
                return res.status(500).json({'error':'error al sustraer datos del empleado'});
            }
            examen = JSON.parse(fileexamen);
            return res.status(200).json(examen);
        });
    } else {
        return res.status(200).json(examen);
    }

}); 

router.post('/new',function(req, res, next){
    var _thingsExamen = Object.assign({} , empleado, req.body);
   
    _thingsExamen.id= uuidv4();
    if(!examen){
        examen = [];
    }
    examen.push(_thingsExamen);
    fileModel.write(examen, function(err){
        if (err){
            console.log(err);
            return res.status(500).json({'error': 'error al obtener datos del empleado '});

        }

        return res.status(200).json(_thingsExamen);
    });

});

router.put('/done/:thingRTN', function(req, res, next){
    var _thingRTN = req.params._thingRTN;
    var _thingUdps = req.body;
    var _thingUddated = null;
    var newExamen = examen.map(
        function(doc, i){
            if (doc.RTN == _thingRTN){
                _thingUddated = Object,assign(
                    {},
                    doc,
                    {"done":true},
                    _thingUdps
                );
                return _thingUddated;
            }
            return doc;
        }
    );
    examen = newExamen;
    fileModel.write(examen, function(err){
        if (err){
            console.log(err);
            return res.status(500).json({ 'error':'error al guardar datos del empleado '});

        }
        return res.status(200).json(_thingUddated);
    });
});

router.delete('/delete/:thingRTN', function(req, res, next){
    var _thingRTN = req.params._thingRTN;
    var newExamen = examen.filter(
      function (doc, i) {
        if (doc.RTN == _thingRTN) {
          return false;
        }
        return true;
      }
    );

    examen = newExamen;
    fileModel.write(examen, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Datos del empleado' });
      }
      return res.status(200).json({"delete": _thingRTN});
    });
  }); 
  
  fileModel.read(function(err , fileexamen){
    if(err){
      console.log(err);
    } else{
      examen = JSON.parse(fileexamen);
    }
  });
module.exports = router;
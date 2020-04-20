const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../service-account-file.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nodefirebase-8f510.firebaseio.com/'
});


const db = admin.database();

router.get('/', (req, res) => {

    db.ref('empresas').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { empresas: data });
    });

});

router.post('/new-empresa', (req, res) => {
    
    const newEmpresa = {
        documento: req.body.documento,
        documentodv: 5,
        razonsocial: req.body.razonsocial,
        diantipodocumentoidentidadid: 6,
        diantipopersonaid: 1,
        activo: true,
        telefono: req.body.telefono,
        entidadcertificadoraid: 0,
        correoelectronicocontacto: req.body.correoelectronicocontacto,
        nombrecontacto: req.body.nombrecontacto,
        testid: '',
        aplicafe: false,
        enviadodian: false,
        usuariovpid: null,
        apikey: null,
        fechacreaapikey: null,
        observacion: req.body.observacion,
        logo: '',
        id: 0,
        idstate: 0,
        createdby: 1,
        createdon: new Date(),
        modifiedby: 1,
        modifiedon: new Date()
    }

    db.ref('empresas').push(newEmpresa);
    res.redirect('/');

});


router.get('/delete-empresa/:id', (req, res) => {

    db.ref('empresas/' + req.params.id).remove();
    res.redirect('/');

});

module.exports = router;


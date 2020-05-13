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

    res.render('index');

});

router.get('/empresas', (req, res) => {

    db.ref('empresas').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('empresas', { empresas: data });
    });

});

router.get('/articulos', (req, res) => {

    db.ref('articulos').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('articulos', { articulos: data });
    });

});


router.post('/new-empresa', (req, res) => {

    const newEmpresa = {
        documento: req.body.documento,
        documentodv: 5,
        razonsocial: req.body.razonsocial,
        diantipodocumentoidentidadid: 6,
        diantipopersonaid: 1,
        diantiporegimenid: 1,
        activo: true,
        telefono: req.body.telefono,
        entidadcertificadoraid: 0,
        correoelectronicocontacto: req.body.correoelectronicocontacto,
        nombrecontacto: req.body.nombrecontacto,
        testid: '111111',
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
        createdon: req.body.modifiedon,
        modifiedby: 1,
        modifiedon: req.body.modifiedon
    }

    console.log(newEmpresa);

    db.ref('empresas').push(newEmpresa);
    res.redirect('/empresas');

});

router.get('/delete-empresa/:id', (req, res) => {

    db.ref('empresas/' + req.params.id).remove();
    res.redirect('/empresas');

});

router.post('/new-articulo', (req, res) => {

    const newArticulo = {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        activo: true,
        empresaid: 6,
        categoriaid: 2,
        dianunidadmedidaid: 2,
        imagen: null,
        codigobarras: req.body.codigobarras,
        valor: 200.0,
        costo: 120.0,
        color: null,
        descuento: 1.0,
        tipodescuento: null,
        favorito: false,
        precioeditable: true,
        aplicaiva: true,
        incluyeimpuesto: true,
        neto: 120.0,
        total: 200.0,
        nombrearticulo: req.body.nombrearticulo,
        valoriva: 1.0,
        aplicainc: true,
        valorinc: 1.0,
        idowner: 1,
        id: 0,
        idstate: 0,
        createdby: 1,
        createdon: req.body.modifiedon,
        modifiedby: 1,
        modifiedon: req.body.modifiedon
    }


    db.ref('articulos').push(newArticulo);
    res.redirect('/articulos');

});

router.get('/delete-articulo/:id', (req, res) => {

    db.ref('articulos/' + req.params.id).remove();
    res.redirect('/articulos');

});

module.exports = router;


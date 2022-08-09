const chai = require('chai');
const assert = chai.assert;

const {findAll} = require('../controllers/area.controller');

describe('Unit Test', ()=>{
    it('debe devolver todas las areas', ()=>{
        var response = findAll()
    })
})
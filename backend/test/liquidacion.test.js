const app = require('../server');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

describe('GET Liquidación de una persona', ()=>{
    request(app).get('/api/liquidacion').then((res)=>{
        console.log(res);
    });
    
    it('should get liquidacion de una persona', ()=>{
        request(app)
        .post('api/liquidacion/')
        .send({})
        .expect(500)
        .then((res)=>{
            console.log('aslkjalskjgla');
            expect(res.headers.location).to.be.eql('api/liquidacionn/');
        })
    })
})

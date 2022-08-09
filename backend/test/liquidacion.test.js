const express = require('express');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

describe('GET Liquidación de una persona', ()=>{
    it('should get liquidacion de una persona', ()=>{
        request(app)
        .post('api/liquidacion/')
        .send({})
        .expect(201)
        .then((res)=>{
            expect(res.headers.location).to.be.eql('api/liquidacion/');
        })
    })
})
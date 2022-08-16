const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

const {liquidarVacaciones, liquidarFeriadosTrabajados} = require('../controllers/liquidacion.controller');

//Funciones para calculos especiales


//Vacaciones:  dos factores muy importantes: 
// - la cantidad de días trabajados durante el año y 
// - la cantidad de años de antigüedad. 
// - antiguedad < 6 meses = xcada 20diashabiles 1 dia de vacaciones.

describe('Calculo liquidacion de vacaciones', ()=>{
    it('1. Vacaciones Proporcional Mensual', (done)=>{
        let antiguedad = 11; //años
        let vacaciones = {
            'dias': 28,
            'valor_dia': 5127.91,
            'monto_total': 81707.74
        }
        expect(liquidarVacaciones(71538.9, 0, antiguedad)).to.equal(vacaciones);
    })
})

//Feriados Trabajados: se calcula similar a vacaciones

describe('Calculo liquidacion de Feriados Trabajados', ()=>{
    it('1. Feriados Trabajados Caso 1', (done)=>{
        let feriadosTrabajados = {
            'dias': 1,
            'valor_dia':1600,
            'monto_total': 1600
        }

        expect(liquidarFeriadosTrabajados(40000, 1)).to.eql(feriadosTrabajados);
        done();
    })
})


// Horas Extras

    //Hs. Extras y Feriados


//Licencias


//Adicionales



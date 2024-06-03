import axios from "axios"
import * as chai from "chai"
import chaiJsonSchemaAjv from "chai-json-schema-ajv"
import { userSkema } from "./GET_API.test.js"

chai.use(chaiJsonSchemaAjv)
const { expect } = chai

describe('UJI POST API', function(){
    describe('1. Menambah Data User (+) Semua data Valid', function(){
        it('Menambah Data Username dan Address secara Valid', async function(){
            const dataValid = {
                username: "James",
                address: {
                    address: "Solo",
                    city: "SoloKulon"
                }
            }
            const res = await axios.post('https://dummyjson.com/users/add', dataValid);
            expect(res.status).to.equal(201);
            expect(res.data).to.be.jsonSchema(userSkema);
        });
    });
    describe('2.  Menambah Data User (-) dengan input yang Invalid', function(){
        it('Gagal Menambah Data karena Username berisi angka', async function(){
            const UsernameSalah = {
                username: 200,
                address: {
                    address: "Solo",
                    city: "SoloKulon"
                  }
            }   
            try{
                if (typeof UsernameSalah.username !== 'string') {
                    throw new TypeError('Username Harus STRING');
                }
                await axios.post('https://dummyjson.com/users/add', UsernameSalah);
            }
            catch (error) {
                expect(error.message).to.equal('Username Harus STRING');
            }
            
        })
    })

    describe('3. Menambah Data User (-) Data Required User tidak Valid', function(){
        it('Gagal Menambah data karena Required Address yang tidak dicantumkan', async function(){
            const requiredSalah = {
                required: ["username", "address"],
                username: "James",
                // address: {
                //     address: "Jalan Gang 6",
                //     city: "Ploso"
                // }
            };
           
            try{
                if (!requiredSalah.address) {
                    throw new Error('Address Harus diisi');
                }
                const res = await axios.post('https://dummyjson.com/users/add', requiredSalah);
            }
            catch (error){
                expect(error.message).to.equal('Address Harus diisi');
                expect(requiredSalah).to.not.have.property('address');
            }
        })
    })
    describe('4. Menambah Data User (-) namun username dan address Duplikat', function(){
        it('Gagal Menambah data user karena data User sudah ada', async function(){
            const duplikat = {
                id: '1',
                username: "emilys",
                address: {
                    address: "263 Tenth Street",
                    city: "San Francisco"
                }
            }
            try {
                const adaUser = await axios.get(`https://dummyjson.com/users/${duplikat.id}`);
                if (adaUser.data.username === duplikat.username) {
                    throw new Error('Username sudah ada');
                }
                const res = await axios.post('https://dummyjson.com/users/add', duplikat);
                expect(res.data).to.be.jsonSchema(userSkema);

            } catch (err) {   
               expect(err.message).to.equal('Username sudah ada');
            }
        });
    });
})
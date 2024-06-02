import axios from "axios"
import * as chai from "chai"
import chaiJsonSchemaAjv from "chai-json-schema-ajv"
import { userSkema } from "./GET_API.test.js"

chai.use(chaiJsonSchemaAjv)
const { expect } = chai

describe('UJI PUT API', function(){
    describe('1. Mengedit Data User (+) Semua data Valid', function(){
        it('Mengedit Data Username dan Address secara Valid', async function(){
            const ubahValid = {
                username: "James",
                address: {
                    address: "Jl. Raya",
                    city: "Bali"
                }
            }
            try {
                const res = await axios.put('https://dummyjson.com/users/1', ubahValid);
                expect(res.data).to.be.jsonSchema(userSkema);
            } 
            catch (err) {
                throw new Error("Failed to update user data: " + err.message);
            }
        });
    });
    describe('2. Mengedit Data User (-) dengan input yang Invalid', function(){
        it('Gagal Mengedit Data karena Username berisi angka', async function(){
            const userAngka = {
                username: 200,
                address: {
                    address: "Jl. Raya",
                    city: "Bali"
                  }
            }   
            try{
                if (typeof userAngka.username !== 'string') {
                    throw new TypeError('Username Harus STRING');
                }
                await axios.put('https://dummyjson.com/users/1', userAngka);
            }
            catch (error) {
                expect(error.message).to.equal('Username Harus STRING');
            }
            
        })
    })

    describe('3. Mengedit Data User (-) Data Required User tidak Valid', function(){
        it('Gagal Mengedit data karena Required Address yang tidak dicantumkan', async function(){
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
                const res = await axios.put('https://dummyjson.com/users/1', requiredSalah);
            }
            catch (error){
                expect(error.message).to.equal('Address Harus diisi');
                expect(requiredSalah).to.not.have.property('address');
            }
        })
    })
})
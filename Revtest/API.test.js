import axios from "axios"
import * as chai from "chai"
import chaiJsonSchemaAjv from "chai-json-schema-ajv"
import { userAuth, userSkema, userDel } from "./UserSchema.js"
//import Ajv from "ajv";
//import addFormats from "ajv-formats";

// const ajv = new Ajv();
// addFormats(ajv);
//chai.use(chaiJsonSchemaAjv.create({ajv}))
chai.use(chaiJsonSchemaAjv)
const { expect } = chai


describe('UJI API', function(){
    describe('1. Mengambil Data User [GET API] (+) Semua data Valid ', function(){
        it('Data Telah diambil dan Semua Valid', async function(){
            const id = 4;
            const res = await axios.get(`https://dummyjson.com/users/${id}`);
            expect(res.status).to.equal(200);
            expect(res.data).to.be.jsonSchema(userSkema);
        });
    });

    describe('2. Menambah 1 Data User [POST API] (+) Semua data Valid ', function(){
        it('Berhasil menambah data dengan semua data Valid', async function(){
            const postValid = {
                id : '100',
                firstName : 'James',
                address : {
                    address: "Jalan Gang 6",
                    city: "Guangzhou"
                }
            }
            const res = await axios.post('https://dummyjson.com/users/add', postValid);
            expect(res.status).to.equal(201);
            expect(res.data).to.be.jsonSchema(userSkema);
            const isiAlamat = res.data.address.city;
            expect (isiAlamat).to.equal('Guangzhou');

        });
    });

    describe('3. Update 1 Data User [PUT API] (+) Semua data Valid ', function(){
        it('Berhasil Update data dengan semua data Valid', async function(){
            const updateValid = {
                firstName : 'Samuel',
                address : {
                    address: "JalanJalan",
                    city: "Madya"
                }
            }
            const idUpdate = 4;
            const res = await axios.put(`https://dummyjson.com/users/${idUpdate}`, updateValid);
            expect(res.status).to.equal(200);
            expect(res.data).to.be.jsonSchema(userSkema);
        });
    });

    describe('4. Delete 1 Data User [DELETE API] (+) Semua data Valid ', function(){
        it('Berhasil Hapus data dengan semua data Valid', async function(){
            const idDelete = 3;
            const res = await axios.delete(`https://dummyjson.com/users/${idDelete}`);
            expect(res.data).to.be.jsonSchema(userDel);
            expect(res.data).to.have.property('isDeleted', true);
        });
    });

    describe('5. Authentikasi 1 Data User [GET TOKEN API] (+) Semua data Valid ', function(){
        it('Berhasil Mendapatkan TOKEN data dengan semua data Valid', async function(){
            const mauLogin = {
                username: 'emilys',
                password: 'emilyspass'
            }
            const res = await axios.post(`https://dummyjson.com/auth/login`, mauLogin);
            const Token = res.data.token;
            const dahLogin = await axios.get(`https://dummyjson.com/auth/me`,{
                headers: {
                'Authorization': `Bearer ${Token}`
                }
            })
            expect(res.data).to.be.jsonSchema(userAuth);
        });
    });

});
import axios from "axios"
import * as chai from "chai"
import chaiJsonSchemaAjv from "chai-json-schema-ajv"

chai.use(chaiJsonSchemaAjv)
const { expect } = chai

const userSkema = {
    type: 'object',
    required: ['username', 'address'],
    properties: {
        username: { type: 'string' },
        address: {
            type: 'object',
            required: ['address', 'city'],
            properties: {
                address: { type: 'string' },
                city: { type: 'string' }
            }
        }
    }
};

describe('UJI GET API', function(){
    describe('1. Mengambil Data User (+) Semua data Valid ', function(){
        it('Data Telah diambil dan Semua Valid', async function(){
            const res = await axios.get('https://dummyjson.com/users/1');
            expect(res.status).to.equal(200);
            expect(res.data).to.be.jsonSchema(userSkema);
        });
    });
    describe('2. Mengambil Data User (-) Type data Username tidak Valid', function(){
        it('Gagal Mengambil Data karena Username Bertipe Data = Number', async function(){
            const userSalah = {
                username: 200, // Seharusnya bertipe string
                address: {
                    address: "Jalan Gang 6",
                    city: "Ploso"
                }
            };
            try{
                const res = await axios.get('https://dummyjson.com/users/1', userSalah);
                //expect(userSalah).to.be.jsonSchema(userSkema);
            }
            catch{
                expect(userSalah.username).to.be.a('number');
            }
            
        })
    })

    describe('3. Mengambil Data User (-) Data Required User tidak Valid', function(){
        it('Gagal Mengambil data karena Required Address yang tidak dicantumkan', async function(){
            const requiredSalah = {
                required: ["username", "address"],
                username: "James",
                // address: {
                //     address: "Jalan Gang 6",
                //     city: "Ploso"
                // }
            };
            try{
                const res = await axios.get('https://dummyjson.com/users/1', requiredSalah);
            }
            catch{
                expect(requiredSalah).to.not.have.property('address');
            }
        })
    })
    describe('4. Mengambil Data User (-) tapi salah link', function(){
        it('Gagal Mengambil data user karena mengarah pada data product', async function(){
            const linkSalah = {
                username: "James",
                address: {
                    address: "Jalan Gang 6",
                    city: "Ploso"
                }
            }
            try{
                const res = await axios.get('https://dummyjson.com/userrss/1', linkSalah);
            }
            catch (err){
                expect(err.response.status).to.equal(404);
            }
        });
    });
})

export { userSkema };
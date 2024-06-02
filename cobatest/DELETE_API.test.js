import axios from "axios"
import * as chai from "chai"
import chaiJsonSchemaAjv from "chai-json-schema-ajv"
import { userSkema } from "./GET_API.test.js"

chai.use(chaiJsonSchemaAjv)
const { expect } = chai

describe('UJI DELETE API', function(){
    describe('1. Delete Data User (+) Semua data Valid', function(){
        it('Delete Data Username dan Address secara Valid', async function(){
            const deleteUser = {
                username: "emilys",
                address: {
                    address: "263 Tenth Street",
                    city: "San Francisco"
                }
            }
            try {
                const res = await axios.delete('https://dummyjson.com/users/1', deleteUser);
                expect(res.data).to.have.property('isDeleted', true);
            } 
            catch (err) {
                throw new Error("Failed to delete user data: " + err.message);
            }
        });
    });
    describe('2. Mendelete Data User (-) yang tidak ada', function(){
        it('Gagal Mendelete Data karena User ID tidak Valid', async function(){
            try {
                await axios.delete('https://dummyjson.com/users/lala99');
            } catch (err) {
                //expect(err.response.status).to.equal(404);
                expect(err.response.status).to.equal(400);
            }
            
        })
    })
})
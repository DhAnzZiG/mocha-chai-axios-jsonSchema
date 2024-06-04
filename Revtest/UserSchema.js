const userSkema = {
    type: 'object',
    required: ['id', 'firstName', 'address'],
    properties: {
        id: { type: 'number' },
        firstName: { type: 'string' },
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

const userAuth = {
    type: 'object',
    required: ['id', 'username', 'email', 'token'],
    properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        email: { type: 'string'},
        token: { type : 'string'},
    }
};

const userDel = {
    type: 'object',
    required: ['id', 'username', 'isDeleted'],
    properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        isDeleted : {type : 'boolean'}
    }
};

export {userSkema, userAuth, userDel}
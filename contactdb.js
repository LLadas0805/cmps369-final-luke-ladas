require('dotenv').config();
const Database = require('dbcmps369');

class ContactDB {
    constructor() {
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect();

        await this.db.schema('Contact', [
            { name: 'id', type: 'INTEGER' },
            { name: 'First_Name', type: 'TEXT' },
            { name: 'Last_Name', type: 'TEXT' },
            { name: 'Prefix', type: 'TEXT' },
            { name: 'Phone_Number', type: 'TEXT' },
            { name: 'Email_Address', type: 'TEXT' },
            { name: 'Address', type: 'TEXT' },
            { name: 'lat', type: 'NUMERIC'},
            { name: 'lng', type: 'NUMERIC'},
            { name: 'Contact_By_Email', type: 'INTEGER' },
            { name: 'Contact_By_Phone', type: 'INTEGER' },
            { name: 'Contact_By_Mail', type: 'INTEGER' }
        ], 'id');

        await this.db.schema('Users', [
            { name: 'id', type: 'INTEGER' },
            { name: 'First_Name', type: 'TEXT' },
            { name: 'Last_Name', type: 'TEXT' },
            { name: 'Username', type: 'TEXT' },
            { name: 'Password', type: 'TEXT' }
        ], 'id');

    }

    async createUser(username, firstname, lastname, password) {
        const id = await this.db.create('Users', [
            { column: 'Username', value: username },
            { column: 'First_Name', value: firstname },
            { column: 'Last_Name', value: lastname },
            { column: 'Password', value: password },
        ])
        return id;
    }

    async createContact(val, address, lat, lng) {

        

        const emailspam = (val.ContactByEmail !== undefined) ? 1 : 0;
        const mailspam = (val.ContactByMail !== undefined) ? 1 : 0;
        const phonespam = (val.ContactByPhone !== undefined) ? 1 : 0;

        const id = await this.db.create('Contact', [
            { column: 'First_Name', value: val.FirstName },
            { column: 'Last_Name', value: val.LastName },
            { column: 'Prefix', value: val.Prefix },
            { column: 'Phone_Number', value: val.PhoneNumber },
            { column: 'Email_Address', value: val.EmailAddress },
            { column: 'Address', value: address },
            { column: 'lat', value: lat },
            { column: 'lng', value: lng },
            { column: 'Contact_By_Email', value: emailspam },
            { column: 'Contact_By_Phone', value: phonespam },
            { column: 'Contact_By_Mail', value:  mailspam},
        ])
        return id;
    }

    
    

    async findUserByUsername(username) {
        
        const us = await this.db.read('Users', [{ column: 'Username', value: username }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findUserById(id) {
        const us = await this.db.read('Users', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findContactById(id) {
        const us = await this.db.read('Contact', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }
    
    async findContacts() {

        
        const contacts = await this.db.read('Contact', [] );

        return contacts;
    }

    async deleteContactById(id) {
        const us = await this.db.delete('Contact', [{ column: 'id', value: id }]);
        return us;
    }

   

    async updateContactById(id, val) {
        

        
        
        const emailspam = (val.ContactByEmail !== undefined) ? 1 : 0;
        const mailspam = (val.ContactByMail !== undefined) ? 1 : 0;
        const phonespam = (val.ContactByPhone !== undefined) ? 1 : 0;
       
        const us = await this.db.update('Contact', [{ column: 'Contact_By_Phone', value: phonespam  },
        { column: 'Contact_By_Email', value: emailspam },
        { column: 'Contact_By_Mail', value: mailspam },
        { column: 'First_Name', value: val.FirstName },
        { column: 'Last_Name', value: val.LastName },
        { column: 'Prefix', value: val.Prefix },
        { column: 'Phone_Number', value: val.PhoneNumber },
        { column: 'Email_Address', value: val.EmailAddress },
        { column: 'Address', value: val.Address }], [{ column: 'id', value: id }]);
        return us;
    }

}

module.exports = ContactDB;
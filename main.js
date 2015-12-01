var builder = require('./uriBuilder.js');
var request = require('request');
var Promise2 = require('promise');

/**
 * get - public function GET authenticated data
 * @param uri
 * @param auth
 * @returns {*|exports|module.exports}
 */
var get = function (uri, auth) {
    return new Promise2(function (fulfill, reject){
       request({
           url: uri,
           method: 'GET',
           headers: {
               'Authorization': ('Bearer ' + auth)
           }},
           function (error, response, body) {
               if (error){
                   reject(error);
               } else if (response.statusCode == 401) {
                   reject("Unauthorized");
               } else {
                   fulfill(body);
               }
           }
       )
    });
}

/**
 * Groove Object
 * @param _auth
 * @constructor
 */
function Groove(_auth){
    this.auth = _auth;
}

/**
 * generate all tickets (pagination)
 * @param assignee
 * @param customer
 * @param page
 * @param per_page
 * @param state
 * @param folder
 */
Groove.prototype.getTickets = function (assignee, customer, page, per_page, state, folder) {
    var _auth = this.auth;
    var _object = "tickets";
    var _params = new Object();
    assignee?_params.assignee = assignee : null;
    customer?_params.customer = customer : null;
    page?_params.page = page : null;
    per_page?_params.per_page = per_page : null;
    state?_params.state = state : null;
    folder?_params.folder = folder : null;
    return builder.buildUri(_object, _params).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * generate all messages of a ticket (pagination)
 * @param ticket_number
 * @param page
 * @param per_page
 */
Groove.prototype.getMessages = function (ticket_number, page, per_page) {
    var _params = new Object();
    var _object = "tickets/"+ticket_number;
    page?_params.page = page : null;
    per_page?_params.page = per_page : null;
    return builder.buildUri(_object, _params).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * generate all customers (pagination)
 * @param page
 * @param per_page
 */
Groove.prototype.getCustomers = function (page, per_page) {
    var _params = new Object();
    var _object = "customers";
    page?_params.page = page : null;
    per_page?_params.page = per_page : null;
    return builder.buildUri(_object, _params).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * generate all mailboxes (pagination)
 */
Groove.prototype.getMailboxes = function () {
    var _object = "mailboxes";
    return builder.buildUri(_object).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * Get count of tickets by folder id
 * @param mailbox
 */
Groove.prototype.getTicketCounts = function (mailbox) {
    var _params = new Object();
    var _object = "tickets/count";
    mailbox?_params.mailbox = mailbox : null;
    return builder.buildUri(_object, _params).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * Get list of agents
 * @param group
 */
Groove.prototype.getAgents = function (group) {
    var _params = new Object();
    var _object = "agents";
    group?_params.group = group : null;
    return builder.buildUri(_object, _params).then(
        function (url) {
            return get(url, _auth).then(JSON.parse);
        }
    );
}

/**
 * Get any uri/ Used for groove chained uri's
 * @param uri
 */
Groove.prototype.getUri = function (uri) {
    return get(uri , this.auth).then(JSON.parse);
}


Groove.prototype.test = function () {
    return builder.buildUri('tickets', {t1:"v1", t2:"v2"})
}

module.exports = Groove;
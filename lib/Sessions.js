var ParamCheck = require('./ParamCheck');
var idUtility = require('./IdentifierUtility');
var Session = require('./Session');
var Host = require('./Host');
var Settings = require('./Settings');

/**
 * Sessions module.
 * @module sessions
 */

/**
 * Represents a @see {@link Session} collection.
 * @public
 * @constructor
 */
function Sessions() {
    this._sessions = [];
}

/**
 * Prototype name
 */
Sessions.prototype.type = 'Sessions';

/**
 * @private
 */
Sessions.prototype._sessions = [];

/**
 * Defines a property to get all sessions.
 * @public
 * @throws on set value.
 * @return {Session[]} a collection of sessions.
 */
Object.defineProperty(Sessions.prototype, 'all', {
    get: function() {
        return this._sessions.slice();
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to add a session.
 * @public
 * @param  {host} Host
 * @param  {settings} Settings
 * @throw when param host equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @return {Session} the newly added session.
 */
Sessions.prototype.add = function(host, settings) {
    if (!new ParamCheck().isInstanceAndTypeOf(host, Host) || !host) {
        throw new Error(
            'Argument `host` is invalid. It is required and must be of the correct type.'
        );
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error(
            'Argument `settings` is invalid. It is required and must be of the correct type.'
        );
    }

    var id = idUtility.generateSessionId();
    var session = new Session(id, settings, host);
    this._sessions.push(session);
    return session;
};

/**
 * Defines a method which gets a registered session by @see{@link session.id}.
 * @Public
 * @param  {id} String
 * @throw when param id equates to false or is an incorrect type.
 * @return session matching the given id; or, null.
 */
Sessions.prototype.getById = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }
    return this._sessions.find(function(s) {
        return s.id === id;
    });
};

/**
 * Defines a method which removes sessions which have been completed.
 * @Public
 */
Sessions.prototype.purgeCompleted = function() {
    this._sessions = this._sessions.filter(function(s) {
        return !s.isSessionCompleted;
    });
};

//Export the class
module.exports = Sessions;

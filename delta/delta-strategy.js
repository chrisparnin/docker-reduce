/**
 * @module delta-strategy
 */


const NOT_IMPLEMENTED = 'not implemented';
class Strategy 
{
    /**
     * Strategy constructor.
     *
     * @param {Object} options                  Options object
     * @param {String} options.language         Strategy language.
     * @param {String} options.langpackPath     Path to strategy langpack file.
     * @param {String} options.dependencyParser Path to executable that can be used to parse dependencies.
     */
    constructor(options = {}) {
        this.language = options.language;
    }

    /**
     * Perform asynchronous initialization.
     *
     * @returns {Promise.<Strategy>}
     */
    async initialize() {
        // Return self for chaining.
        return this;
    }

    async createVariations(name, calls) {
        throw new Error(NOT_IMPLEMENTED);
    }

}

module.exports = Strategy;
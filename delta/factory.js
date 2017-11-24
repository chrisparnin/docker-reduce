/**
 * @module strategy-factory
 */


/**
 * StrategyFactory class
 */
class StrategyFactory {
    
    /**
     * Construct a new factory.
     */
    constructor() {
        this.strategies = new Map();
    }

    /**
     * Get a new language strategy.
     *
     * @param   {String}             language Language of the strategy to return.
     * @returns {Promise.<Strategy>}          Strategy for given language.
     */
    async get(language) {

        try {
            // Load and init if not already available
            if (!(language in this.strategies)) {
                let Strategy = require(`./strategies/${language}`);
                this.strategies[language] = await (new Strategy()).initialize();
            }

            // Return
            return this.strategies[language];

        }
        catch(err) {
            throw new Error(`Language '${language}' not supported.`);
        }

    }

}
    
// Export factory class
module.exports = StrategyFactory;
class IndexService {
    async testGet(req, res) {
        const { email } = req.body;
        try {
            const result = {
                message: 'test api get response'
            };
            return result
        } catch (error) {
            throw error;
        }
    }
    async test(req, res) {
        const { email } = req.body;
        try {
            const result = { email: email };
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new IndexService();


module.exports = () => {
    getNonFreeTimes: async(request, response) => {
        try {
			const date = req.params.date;
		}
		catch (err) {
		    res.status(500).send(err)
		}
    }
};
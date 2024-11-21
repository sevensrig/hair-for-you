

module.exports = () => {
    getNonFreeTimes: async(req, res) => {
        try {
			res.json({
				"times":["10:00 - 10:40", "11:00 - 11:40", "1:00 - 1:40", "2:00 - 2:40"]
			});
		}
		catch (err) {
		    res.status(500).send(err)
		}
    }
};
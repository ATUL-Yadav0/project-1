const Restaurants = require ("../Models/restaurant")

exports.RestaurantsByLocationId = (req, res) => {
    const { locId } = req.params;

    Restaurants.find({ city: locId }, {})
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.postFilterRestaurant = (req, res) => {
    var { mealtype, location, cuisine, hcost, lcost, sort, page} = req.body;

    sort = sort ? sort : 1;
    page = page? page : 1;
    const itemsPerPage = 2;

    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["type.mealtype"] = mealtype);
    location && (filterObj["city"] = location);
    cuisine && (filterObj["Cuisine.cuisine"] = { $in: [cuisine] });
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost});
    

    console.log(filterObj);
    console.log(sort);

    // let query = Restaurants.find(filterObj);

    // if (sort) {
    //     query = query.sort(sort);
    // }

    // query = query.skip((page - 1) * itemsPerPage).limit(itemsPerPage);

    // query
        Restaurants.find(filterObj).sort({ cost: sort})
            .then(response => {
                const filteredResponse = response.slice(startIndex, endIndex)
                res.status(200).json({
                    message: "Restaurant Fetched Successfully",
                    restaurant: filteredResponse
                })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
}

exports.RestaurantsById = (req, res) => {
    const { Id } = req.params;

    Restaurants.findById( Id )
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

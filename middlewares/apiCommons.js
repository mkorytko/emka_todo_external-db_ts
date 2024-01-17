module.exports = (req, res, next) => {
    res.sendData = (data, total, params) => {
        const json = {
            success: true,
            payload: data,
        };
        if (typeof (total) !== "undefined") {
            const { limit } = req.preparePagination();
            json.pagination = {
                limit,
                total,
                pages: (limit > 0) ? Math.ceil(total / limit) : 0,
            };
        }

        if (params) {
            Object.keys(params).forEach((field) => {
                if (typeof json[field] !== "undefined") {
                    return;
                }
                json[field] = params[field];
            });
        }

        return res.status(200)
            .json(json);
    };

    res.sendError = (error, code = 500) => res.status(code)
        .json({
            success: false,
            error,
        });

    req.preparePagination = () => {
        const limit = 3;

        let page = 1;
        if (req.query.page > 0) {
            page = Number(req.query.page);
        }

        return {
            limit,
            page,
        };
    };

    req.orderBy = () => {
        const order = req.query?.order || "asc";
        const orderCol = req.query?.orderCol || "id";
        return {
            order,
            orderCol,
        };
    };

    next();
};

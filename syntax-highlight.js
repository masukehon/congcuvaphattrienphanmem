exports.login = (req, res) => {
    let data = _extend({}, req.body);

    Joi.validate(data, schemas.login, err => {
        if (err)
            return responseError(res, 422);

        Admin.findOne({ email: data.email }).then(admin => {
            if (!admin || !bcrypt.compareSync(data.password, admin.password))
                responseError(res, 404, 'Email and password does not match');
            else
                responseOk(res, admin.toJSON({
                    login: true
                }));

        }).catch(err => responseError(res, 500, err.message));
    });
};
const ApiError = require('../ApiError');
const {Student} = require("../models");
const excelJS = require("exceljs");

class StudentController {

    async create(req, res, next) {
        try {
            const {firstName, lastName, lecture, date} = JSON.parse(req.body.data);
            console.log(firstName, lastName, lecture, date)
            const info = await Student.create({firstName, lastName, lecture, date});
            res.json({status: 'ok'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async get(req, res) {
        const data = await Student.findAll({order: [['updatedAt', 'DESC']]});
        res.json({data});
    }

    async update(req, res, next) {
        try {
            const {id, firstName, lastName, lecture, date} = JSON.parse(req.body.data);
            const info = await Student.update({firstName, lastName, lecture, date}, {where: {id}});
            res.json({status: 'ok'})
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Student.destroy(
                {
                    where: {id},
                }
            )
            const infos = await Student.findAll();
            return res.json({
                status: 'ok',
                infos
            })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async exportUser(req, res) {
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Users");
        const path = "./files";
        worksheet.columns = [
            {header: "First Name", key: "fname", width: 20},
            {header: "Last Name", key: "lname", width: 20},
            {header: "Lecture", key: "lecture", width: 30},
            {header: "Date", key: "date", width: 10},
        ];
        const user = await Student.findAll();
        user.map((data) => {
            data.fname = (data.dataValues.firstName)
            data.lname = (data.dataValues.lastName)
            data.lecture = (data.dataValues.lecture)
            data.date = (data.dataValues.date)
            data.font = {bold: true, size: 13}
            worksheet.addRow(data);
        })

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = {bold: true, size: 16};
        });
        try {
            const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
                .then(() => {
                    const file = `${path}/users.xlsx`
                    res.download(file);
                });
        } catch (err) {
            console.log(err)
            res.send({
                status: "error",
                message: "Something went wrong",
            });
        }
    };
}

module.exports = new StudentController()

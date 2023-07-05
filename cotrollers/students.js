const mentors = require('../models/mentor');
const students = require('../models/students');

// Adding the student to the database
const addStudent = async (req, res) => {
    const emailFound = await students.findOne({ email: req.body.email })
    //email matching
    if (emailFound) {
        return res.status(400).send("Email already exist")
    }
    const idFound = await students.findOne({ studentId: req.body.studentId })
    //id matching
    if (idFound) {
        return res.status(400).send("Id already assigned ")
    }
    const createStudent = new students({
        studentId: req.body.studentId,
        name: req.body.name,
        email: req.body.email,
    })
    try {
        await createStudent.save();
        return res.status(201).send({ message: "Student added sucessfully", AddedStudent: createStudent });
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

//assign one mentor to multiple students
const multipleAssign = async (req, res) => {
    const { studentIds, mentorId } = req.body

    try {
        const mentor = await mentors.findOne({ mentorId: mentorId })
        if (!mentor) {
            return res.status(400).send("mentor not found")
        }

        for (const studentId of studentIds) {
            const student = await students.findOne({ studentId: studentId })
            if (!student) {
                return res.status(400).send("student not found")
            }

            await student.updateOne({ previousMentor: student.currentMentor })
            await student.updateOne({ currentMentor: mentor })

        }

        res.status(200).send({ message: "students assigned sucessfully" })

    }

    catch (error) {
        res.status(400).send(error)
    }
}

//assigning one student to one mentor
const assignMentor = async (req, res) => {
    const { studentId, mentorId } = req.body

    try {
        const mentorDetails = await mentors.findOne({ mentorId: mentorId })
        if (!mentorDetails) {
            return res.status(400).send("mentor not found")
        }

        const student = await students.findOne({ studentId: studentId })
        if (!student) {
            return res.status(400).send("student not found")
        }
        await student.updateOne({ previousMentor: student.currentMentor })
        await student.updateOne({ currentMentor: mentorDetails })
        res.status(200).send({ message: "mentor assignes sucessfully", AssignedStudent: student.name, Mentor: mentorDetails })

    }
    catch (error) {
        res.status(400).send(error)
    }

}

//Show all students of a particular mentor using mentorid as params.
const getStudents = async (req, res) => {
    const { id } = req.params

    try {
        const mentor = await mentors.findOne({ mentorId: id })
        const mentorname = mentor.name
        const student = await students.find({ currentMentor: mentor._id })
        const details = student.map(items => {
            const { studentId, name, email } = items;
            return { studentId, name, email, mentorname }
        })
        res.status(200).send({ students: details })
    }
    catch (error) {
        res.status(400).send(error)
    }
}

// find previous mentor of a particular student by passing studentId parameter
const findpreMentor = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await students.findOne({ studentId: id })
        if (!student) {
            return res.status(400).send("student not found")
        }
        const { previousMentor } = student
        res.status(200).send(await mentors.findOne({ _id: previousMentor }))
    }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports.multipleAssign = multipleAssign;
module.exports.getStudents = getStudents;
module.exports.findpreMentor = findpreMentor;
module.exports.addStudent = addStudent;
module.exports.assignMentor = assignMentor;
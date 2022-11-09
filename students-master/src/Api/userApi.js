import api from "./index";

export const student = async (firstName, lastName, lecture, date) => {
    console.log(firstName, lastName, lecture, date, 'datadatadatadatadatadatadatadatadata');
    const { data } = await api.post('/student/information', { data: JSON.stringify({ firstName, lastName, lecture, date }) });
    return data;
}

export const updateStudent = async (id, firstName, lastName, lecture, date) => {
    const { data } = await api.put(`/student/information/update/${id}`, {
        data: JSON.stringify({
            id,
            firstName,
            lastName,
            lecture,
            date
        })
    });
    return data;
}

export const deleteStudent = async (id) => {
    const { data } = await api.delete(`/student/information/delete/${id}`);
    return data;
}


export const exportStudent = async () => {
    const { data } = await api.get('/student/export');
    return data;
}

export const getStudentInfo = async () => {
    const { data } = await api.get('/student/info');
    return data;
}

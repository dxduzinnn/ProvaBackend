let teacherList = [
  {
    id: 1,
    nome: "Eduardo Moraes de Almeida Martins",
    idade: 20,
    departamento: "Tecnologia",
    turmas: [
      { codigo: "T01", disciplina: "Backend", alunosMatriculados: 25 }
    ]
  }
];

const listTeachers = (req, res) => {
  return res.status(200).json(teacherList);
};

const getTeachersById = (req, res) => {
  const { id } = req.params;
  const teacher = teacherList.find(t => t.id == id);

  if (!teacher) {
    return res.status(404).json({ error: "Id não existente" });
  }

  return res.status(200).json(teacher);
};

const listClasses = (req, res) => {
  const { id } = req.params;
  const teacher = teacherList.find(t => t.id == id);

  if (!teacher) {
    return res.status(404).json({ error: "Id não existente" });
  }

  return res.status(200).json(teacher.turmas);
};

const createTeacher = (req, res) => {
  const { nome, idade, departamento, turmas } = req.body;
  const newTeacher = {
    id: teacherList.length > 0 ? teacherList[teacherList.length - 1].id + 1 : 1,
    nome,
    idade,
    departamento,
    turmas: turmas || []
  };
  teacherList.push(newTeacher);
  return res.status(201).json(newTeacher);
};

const updateTeacher = (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;
  const index = teacherList.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Id não existente" });
  }

  teacherList[index] = {
    ...teacherList[index],
    nome: nome !== undefined ? nome : teacherList[index].nome,
    idade: idade !== undefined ? idade : teacherList[index].idade,
    departamento: departamento !== undefined ? departamento : teacherList[index].departamento
  };

  return res.status(200).json(teacherList[index]);
};

const addClass = (req, res) => {
  const { id } = req.params;
  const newClass = req.body;
  const teacher = teacherList.find(t => t.id == id);

  if (!teacher) {
    return res.status(404).json({ error: "Id não existente" });
  }

  teacher.turmas.push(newClass);
  return res.status(201).json(teacher);
};

const listByDepartment = (req, res) => {
  const { departamento } = req.params;
  const filtered = teacherList.filter(
    t => t.departamento.toLowerCase() === departamento.toLowerCase()
  );
  return res.status(200).json(filtered);
};

const removeTeacher = (req, res) => {
  const { id } = req.params;
  const index = teacherList.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Id não existente" });
  }

  const removed = teacherList.splice(index, 1);
  return res.status(200).json({ message: "Removido com sucesso", teacher: removed[0] });
};

module.exports = {
  listTeachers,
  getTeachersById,
  listClasses,
  createTeacher,
  updateTeacher,
  addClass,
  listByDepartment,
  removeTeacher
};
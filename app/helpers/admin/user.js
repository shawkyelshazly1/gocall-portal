import prisma from "../../../prisma";
import { Position } from "@prisma/client";
import bcryptjs from "bcryptjs";
import passwordGenerator from "generate-password";
import exportFromJSON from "export-from-json";
import S from "underscore.string";

// load all users
export const loadUsers = async (skip, take) => {
	try {
		let users = await prisma.employee.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				position: true,
				department: {
					select: {
						name: true,
					},
				},
				manager: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
			skip,
			take,
		});

		return users;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load usersCount for table pagination
export const getUsersCount = async () => {
	try {
		let usersCount = await prisma.employee.count({});

		return usersCount;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load user info
export const loadUser = async (userId) => {
	try {
		let user = await prisma.employee.findUnique({
			where: { id: userId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				position: true,
				manager: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
				department: {
					select: {
						name: true,
					},
				},
			},
		});

		return user;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load Departments
export const loadDepartments = async () => {
	try {
		let departments = await prisma.department.findMany({
			where: { parentId: null },
			select: {
				id: true,
				name: true,
			},
		});

		return departments;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load Departments
export const loadSubDepartment = async (deptId) => {
	try {
		let subDepartments = await prisma.department.findMany({
			where: { parentId: deptId },
			select: {
				id: true,
				name: true,
			},
		});

		return subDepartments;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load Departments
export const loadDepartmentPeople = async (departmentId) => {
	try {
		let people = await prisma.employee.findMany({
			where: {
				departmentId: departmentId,
			},
			select: {
				firstName: true,
				lastName: true,
				id: true,
			},
		});

		return people;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// load positions
export const loadPositions = async () => {
	try {
		return Position;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// create new user
export const createUser = async (userDetails) => {
	try {
		let newEmployee = await prisma.employee.create({
			data: { ...userDetails },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				position: true,
				department: {
					select: {
						name: true,
					},
				},
				manager: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		let username = await generateUniqueUsername([
			newEmployee.firstName,
			newEmployee.lastName,
		]);

		let password = passwordGenerator.generate({
			length: 10,
			numbers: true,
		});

		let loginDetails = await prisma.loginDetails.create({
			data: {
				username: username,
				password: await bcryptjs.hash(password, 10),
				employeeId: newEmployee.id,
			},
			select: {
				username: true,
			},
		});

		let employeeInfo = {
			...newEmployee,
			username,
			password,
		};

		return employeeInfo;
	} catch (error) {
		return { error: "Email exists already!" };
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// generate username and check availability
export const generateUniqueUsername = async (names) => {
	let username = (
		names[0].substring(0, 1) +
		names[1] +
		"_" +
		String(Math.floor(Math.random() * 999))
	).toLowerCase();

	return await prisma.loginDetails
		.findUnique({
			where: { username: username },
		})
		.then((user) => {
			if (user) {
				return generateUniqueUsername(model, names);
			}

			return username;
		})
		.catch((error) => {
			console.error(error);
		});
};

// export data to csv
export const exportWFRToCsv = (data) => {
	let fileName = "WFR";
	let exportType = exportFromJSON.types.csv;
	data = ensureArray(data);
	data = data.map((request) => {
		return {
			id: request.id,
			firstName: S(request.firstName).capitalize().value(),
			lastName: S(request.lastName).capitalize().value(),
			email: request.email,
			position: request.position
				.split("_")
				.map((value) => S(value).capitalize().value())
				.join(" "),
			department: request.department.name
				.split("_")
				.map((value) => S(value).capitalize().value())
				.join(" "),
			managerId: request.manager.id,
			manager: `${S(request.manager.firstName).capitalize().value()}  ${S(
				request.manager.lastName
			)
				.capitalize()
				.value()}`,
			username: request.username,
			password: request.password,
		};
	});
	exportFromJSON({ data, fileName, exportType });
};

const ensureArray = (data) => {
	if (Array.isArray(data)) {
		return data; // Data is already an array, no change needed
	} else if (data !== null && data !== undefined) {
		return [data]; // Convert the single object into an array
	} else {
		return []; // Return an empty array for null or undefined
	}
};

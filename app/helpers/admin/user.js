import prisma from "../../../prisma";
import { Position } from "@prisma/client";

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

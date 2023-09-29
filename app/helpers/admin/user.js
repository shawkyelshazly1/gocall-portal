import prisma from "../../../prisma";

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

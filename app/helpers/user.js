import prisma from "../../prisma";

export const loginUser = async (username, password) => {
	try {
		let existingUser = await prisma.user.findFirst({
			where: { username: username },
		});

		return existingUser;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

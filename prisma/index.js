const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	[
		{
			username: "shawky",
			password: "$2a$10$kRP1OrHoAgY2fb7wSs0PhOl.UEFba1ceZCAGTOOoCzhKeTO1gzIQq",
			employeeId: 2,
		},
		{
			username: "abassy",
			password: "$2a$10$kRP1OrHoAgY2fb7wSs0PhOl.UEFba1ceZCAGTOOoCzhKeTO1gzIQq",
			employeeId: 1,
		},
	].forEach(async (employee) => {
		await prisma.loginDetails.create({
			data: {
				username: employee.username,
				password: employee.password,
				employeeId: employee.employeeId,
			},
		});
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

// export default prisma;

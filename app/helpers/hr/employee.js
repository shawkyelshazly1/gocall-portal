import prisma from "@/prisma/index";

// find employees
export const searchEmployees = async (searchParams) => {
	try {
		let employees = await prisma.employee.findMany({
			where: {
				OR: [
					{ id: { equals: parseInt(searchParams.search) || 0 } },
					{ firstName: { contains: searchParams.search?.split(" ")[0] } },
					{
						lastName: {
							contains:
								searchParams.search?.split(" ")[1] || searchParams.search,
						},
					},
					{ middleName: { contains: searchParams.search } },
					{
						department: {
							name: { contains: searchParams.search?.split(" ").join("_") },
						},
					},
					{
						position: {
							title: { contains: searchParams.search?.split(" ").join("_") },
						},
					},
					{ nationality: { contains: searchParams.search } },
				],
			},
			include: {
				department: true,
				position: true,
			},
		});

		return employees;
	} catch (error) {
		console.error("Error searching for employees:", error);
	} finally {
		await prisma.$disconnect();
	}
};

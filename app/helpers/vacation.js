import exportFromJSON from "export-from-json";
import prisma from "../../prisma";
import moment from "moment";

// load user vacation balance
export const loadUserVacationBalance = async (userId, vacationBalance) => {
	let currentYear = new Date().getFullYear();
	try {
		let usedBalance = await prisma.vacationRequest.groupBy({
			by: ["reason"],
			_count: {
				approvalStatus: true,
			},
			where: {
				employeeId: parseInt(userId),
				approvalStatus: "approved",
				from: { gte: new Date(currentYear, 0, 1) },
				to: { lte: new Date(currentYear, 11, 31) },
			},
		});

		usedBalance = usedBalance.map((item) => {
			return { vacationType: item.reason, days: item._count.approvalStatus };
		});

		return usedBalance;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// submit vacation request
export const submitVacationRequest = async (vacationData) => {
	try {
		let vacationRequest = await prisma.vacationRequest.create({
			data: {
				...vacationData,
			},
		});

		return vacationRequest;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// Load user vacation requests history
export const loadVacationRequests = async (userId, skip, take) => {
	try {
		let vacationRequests = await prisma.vacationRequest.findMany({
			where: { employeeId: userId },
			select: {
				id: true,
				createdAt: true,
				employee: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
					},
				},
				reason: true,
				from: true,
				to: true,
				approvalStatus: true,
				approvedByManager: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			skip,
			take,
		});

		return vacationRequests;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// Load user vacation requests history
export const loadVacationRequestsCount = async (userId) => {
	try {
		let vacationRequestsCount = await prisma.vacationRequest.count({
			where: { employeeId: userId },
		});

		return vacationRequestsCount;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// export data to csv
export const exportToCsv = (data) => {
	let fileName = "VacationRequestsHistory";
	let exportType = exportFromJSON.types.csv;
	data = data.map((request) => {
		return {
			...request,
			createdAt: moment(request.createdAt).format("MM/DD/yyy"),
			from: moment(request.from).format("MM/DD/yyy"),
			to: moment(request.to).format("MM/DD/yyy"),
			user: request.user.username,
			approvedByUser: request.approvedByUser?.username || null,
		};
	});
	exportFromJSON({ data, fileName, exportType });
};

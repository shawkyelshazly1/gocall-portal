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
export const submitVacationRequest = async (vacationData, userId) => {
	try {
		let vacationRequest = await prisma.vacationRequest.create({
			data: {
				...vacationData,
				employeeId: userId,
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

// load all user requests
export const loadAllUserRequests = async (userId) => {
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

// Load manager pending team requests
export const loadTeamRequestsCount = async (userId) => {
	try {
		let teamVacationRequestsCount = await prisma.vacationRequest.count({
			where: {
				approvalStatus: "pending",
				employee: {
					managerId: parseInt(userId),
				},
			},
		});

		return teamVacationRequestsCount;
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
};

// Load Manager pending Team requests
export const loadTeamVacationRequests = async (userId, skip, take) => {
	try {
		let vacationRequests = await prisma.vacationRequest.findMany({
			where: {
				approvalStatus: "pending",
				employee: {
					managerId: parseInt(userId),
				},
			},
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

// update request status as manager
export const updateRequestStatus = async (data, managerId) => {
	try {
		let request = await prisma.vacationRequest.findUnique({
			where: { id: parseInt(data.requestId) },
			select: {
				employee: {
					select: {
						managerId: true,
					},
				},
			},
		});

		if (parseInt(request.employee.managerId) !== parseInt(managerId)) {
			return null;
		}

		let updatedRequest = await prisma.vacationRequest.update({
			where: {
				id: data.requestId,
			},
			data: {
				approvalStatus: data.status,
				approvedBy: managerId,
			},
		});

		if (!updatedRequest) {
			return null;
		}

		return updatedRequest;
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
			employee: `${request.employee?.firstName} ${request.employee?.lastName}`,
			approvedByManager:
				request.approvalStatus === "pending"
					? ""
					: `${request.approvedByManager?.firstName} ${request.approvedByManager?.lastName}`,
		};
	});
	exportFromJSON({ data, fileName, exportType });
};

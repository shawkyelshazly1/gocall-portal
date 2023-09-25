import exportFromJSON from "export-from-json";
import prisma from "../../prisma";
import moment from "moment";

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
export const loadVacationRequests = async (userId) => {
	try {
		let vacationRequests = await prisma.vacationRequest.findMany({
			where: { userId: userId },

			select: {
				createdAt: true,
				user: {
					select: {
						username: true,
					},
				},
				reason: true,
				from: true,
				to: true,
				approvalStatus: true,
				approvedByUser: {
					select: {
						username: true,
					},
				},
			},
		});

		return vacationRequests;
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

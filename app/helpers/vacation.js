import exportFromJSON from "export-from-json";
import prisma from "../../prisma";

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
	exportFromJSON({ data, fileName, exportType });
};

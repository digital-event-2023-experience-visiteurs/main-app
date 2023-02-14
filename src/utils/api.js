const baseApiUrl = "http://localhost:3000/v1"

export function fetchSchedules() {
	return new Promise((resolve, reject) => {
		fetch(`${baseApiUrl}/schedules`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		})
			.then((response) => response.json())
			.then((article) => resolve(article))
			.catch((error) => reject(error))
	})
}

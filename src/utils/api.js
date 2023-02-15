const baseApiUrl = "https://expvisit.floriansylvain.fr/v1"

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

export function postUser(user) {
	return new Promise((resolve, reject) => {
		fetch(`${baseApiUrl}/schedules/reserve`, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				schedules: user.schedules,
			}),
		})
			.then((response) => response.json())
			.then((article) => resolve(article))
			.catch((error) => reject(error))
	})
}

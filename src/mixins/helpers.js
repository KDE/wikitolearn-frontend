export default {
	methods: {
		slice(array, keys) {
			let array2 = []
			for (let obj of array) {
				let obj2 = {}
				for (let key of keys) {
					obj2[key] = obj[key]
				}
				array2.push(obj2)
			}
			return array2
		}
	}
}

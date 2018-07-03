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
		},
		filterKeys(object, keys) {
			let obj = {}
			for (let key of keys) {
				obj[key] = object[key]
			}
			return obj
		},
		updateMetaTitle(title) {
			document.title = `${title} - WikiToLearn - collaborative textbooks`
		}
	}
}

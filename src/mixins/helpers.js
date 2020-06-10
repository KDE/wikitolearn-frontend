export default {
	methods: {
		slice(array, keys) {
			const array2 = []
			for (const obj of array) {
				const obj2 = {}
				for (const key of keys) {
					obj2[key] = obj[key]
				}
				array2.push(obj2)
			}
			return array2
		},
		filterKeys(object, keys) {
			const obj = {}
			for (const key of keys) {
				obj[key] = object[key]
			}
			return obj
		},
		updateMetaTitle(title) {
			document.title = `${title} - WikiToLearn - collaborative textbooks`
		}
	}
}

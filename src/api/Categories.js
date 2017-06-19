import { Api } from "./Api"

class CategoriesClass {
	get(categoryName) {
		return Api.get(`categories/${categoryName}`)
	}

	getRootCategories() {
		return Api.get("categories/")
	}
}

export const Categories = new CategoriesClass()
